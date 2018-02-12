define([
  'angular',
  'lodash',
  'app/core/utils/datemath',
  'moment',
],
function (angular, _, dateMath) {
  'use strict';

  /** @ngInject */
  function OpenTsDatasource(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = 'opentsdb';
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.withCredentials = instanceSettings.withCredentials;
    this.basicAuth = instanceSettings.basicAuth;
    instanceSettings.jsonData = instanceSettings.jsonData || {};
    this.tsdbVersion = instanceSettings.jsonData.tsdbVersion || 1;
    this.tsdbResolution = instanceSettings.jsonData.tsdbResolution || 1;
    this.supportMetrics = true;
    this.tagKeys = {};

    //console.info(res);
    this.cnMap={
      'env.air.beichen':'大气监测站点',
      'env.power.beichen':'企业电力监测站点',
      'env.video.beichen':'视频监控站点',
      'env':'环境',
      'env.air':'空气',
      'env.water':'水质',
      'env.gas':'废气',
      'public':'公共',
      'private':'私有',
      'env.device':'设备',
      'etc':'其他',
      'evn':'evn',
      'swm':'swm',
      'swm.flowmeter':'流量计',
      'swm.pressuremeter':'压力计',
      'swm.watermeter':'水表',
      'site':'站点',
      'city':'城市',
      'DT':'设备温度',
      'PRESSURE':'压力',
      'FLOW':'流量',
      'TOTAL_FLOW_L':'大管总流量',
      'TOTAL_FLOW_S':'小管总流量',
      'TEMPERATURE':'温度',
      'HUMIDITY':'湿度',
      'epa':'市环保局监测信息系统',
      'company':'国控市控重点企业监管系统',//重点企业电力电量负荷监测系统
      'town':'镇级空气环境质量监测系统',
      //'private':'空气网格化监测系统',
      'odour':'恶臭污染物连续监测系统',
      'police':'公安高清视频监控',
      'straw':'监测秸秆焚烧的高架监控系统',
      'SPEED':'风速',
      'DIRECTION':'风向',
      'CURRENT':'电流',
      'POWER':'电量',
      'SOC':'剩余电流',
      'VOLTAGE'	:'电压',


    };
    this.air=['AQI','PM25','PM10','O3','SO2','NO2','CO','TEMPERATURE','HUMIDITY'];
    this.water=['PH','DO','COD','FTU','CT','TEMPERATURE','TOTAL_P','NH3_N'];
    this.gas=['CL2','ETO','HCL','NH3','C6H6','H2S','C7H8','TEMPERATURE','HUMIDITY'];

    // Called once per panel (graph)
    this.query = function(options) {
      var start = convertToTSDBTime(options.rangeRaw.from, false);
      var end = convertToTSDBTime(options.rangeRaw.to, true);
      var qs = [];

      _.each(options.targets, function(target) {
        if (!target.metric) { return; }
        qs.push(convertTargetToQuery(target, options, this.tsdbVersion));
      }.bind(this));

      var queries = _.compact(qs);

      // No valid targets, return the empty result to save a round trip.
      if (_.isEmpty(queries)) {
        var d = $q.defer();
        d.resolve({ data: [] });
        return d.promise;
      }

      var groupByTags = {};
      _.each(queries, function(query) {
        if (query.filters && query.filters.length > 0) {
          _.each(query.filters, function(val) {
            groupByTags[val.tagk] = true;
          });
        } else {
          _.each(query.tags, function(val, key) {
            groupByTags[key] = true;
          });
        }
      });

      options.targets = _.filter(options.targets, function(query) {
        return query.hide !== true;
      });

      return this.performTimeSeriesQuery(queries, start, end).then(function(response) {
        var metricToTargetMapping = mapMetricsToTargets(response.data, options, this.tsdbVersion);
        var result = _.map(response.data, function(metricData, index) {
          index = metricToTargetMapping[index];
          if (index === -1) {
            index = 0;
          }
          this._saveTagKeys(metricData);

          return transformMetricData(metricData, groupByTags, options.targets[index], options, this.tsdbResolution);
        }.bind(this));
        return { data: result };
      }.bind(this));
    };

    this.annotationQuery = function(options) {
      var start = convertToTSDBTime(options.rangeRaw.from, false);
      var end = convertToTSDBTime(options.rangeRaw.to, true);
      var qs = [];
      var eventList = [];

      qs.push({ aggregator:"sum", metric:options.annotation.target });

      var queries = _.compact(qs);

      return this.performTimeSeriesQuery(queries, start, end).then(function(results) {
        if(results.data[0]) {
          var annotationObject = results.data[0].annotations;
          if(options.annotation.isGlobal){
            annotationObject = results.data[0].globalAnnotations;
          }
          if(annotationObject) {
            _.each(annotationObject, function(annotation) {
              var event = {
                text: annotation.description,
                time: Math.floor(annotation.startTime) * 1000,
                annotation: options.annotation
              };

              eventList.push(event);
            });
          }
        }
        return eventList;

      }.bind(this));
    };

    this.targetContainsTemplate = function(target) {
      if (target.filters && target.filters.length > 0) {
        for (var i = 0; i < target.filters.length; i++) {
          if (templateSrv.variableExists(target.filters[i].filter)) {
            return true;
          }
        }
      }

      if (target.tags && Object.keys(target.tags).length > 0) {
        for (var tagKey in target.tags) {
          if (templateSrv.variableExists(target.tags[tagKey])) {
            return true;
          }
        }
      }

      return false;
    };

    this.performTimeSeriesQuery = function(queries, start, end) {
      var msResolution = false;
      if (this.tsdbResolution === 2) {
        msResolution = true;
      }
      var reqBody = {
        start: start,
        queries: queries,
        msResolution: msResolution,
        globalAnnotations: true
      };
      if (this.tsdbVersion === 3) {
        reqBody.showQuery = true;
      }

      // Relative queries (e.g. last hour) don't include an end time
      if (end) {
        reqBody.end = end;
      }

      var options = {
        method: 'POST',
        url: this.url + '/api/query',
        data: reqBody
      };

      this._addCredentialOptions(options);
      return backendSrv.datasourceRequest(options);
    };

    this.suggestTagKeys = function(metric) {
      return $q.when(this.tagKeys[metric] || []);
    };

    this._saveTagKeys = function(metricData) {
      var tagKeys = Object.keys(metricData.tags);
      _.each(metricData.aggregateTags, function(tag) {
        tagKeys.push(tag);
      });

      this.tagKeys[metricData.metric] = tagKeys;
    };

    this._performSuggestQuery = function(query, type) {
      return this._get('/api/suggest', {type: type, q: query, max: 1000}).then(function(result) {
        return result.data;
      });
    };

    this._performMetricKeyValueLookup = function(metric, keys) {

      if(!metric || !keys) {
        return $q.when([]);
      }

      var keysArray = keys.split(",").map(function(key) {
        return key.trim();
      });
      var key = keysArray[0];
      var keysQuery = key + "=*";

      if (keysArray.length > 1) {
        keysQuery += "," + keysArray.splice(1).join(",");
      }

      var m = metric + "{" + keysQuery + "}";

      return this._get('/api/search/lookup', {m: m, limit: 3000}).then(function(result) {
        result = result.data.results;
        var tagvs = [];
        _.each(result, function(r) {
          if (tagvs.indexOf(r.tags[key]) === -1) {
            tagvs.push(r.tags[key]);
          }
        });
        return tagvs;
      });
    };

    this._performMetricKeyLookup = function(metric) {
      if(!metric) { return $q.when([]); }

      return this._get('/api/search/lookup', {m: metric, limit: 1000}).then(function(result) {
        result = result.data.results;
        var tagks = [];
        _.each(result, function(r) {
          _.each(r.tags, function(tagv, tagk) {
            if(tagks.indexOf(tagk) === -1) {
              tagks.push(tagk);
            }
          });
        });
        return tagks;
      });
    };

    this._get = function(relativeUrl, params) {
      var options = {
        method: 'GET',
        url: this.url + relativeUrl,
        params: params,
      };

      this._addCredentialOptions(options);

      return backendSrv.datasourceRequest(options);
    };

    this._addCredentialOptions = function(options) {
      if (this.basicAuth || this.withCredentials) {
        options.withCredentials = true;
      }
      if (this.basicAuth) {
        options.headers = {"Authorization": this.basicAuth};
      }
    };

    this.metricFindQuery = function(query,options) {
      if (!query) { return $q.when([]); }

      var interpolated;
      try {
        interpolated = templateSrv.replace(query, {}, 'distributed');
      }
      catch (err) {
        return $q.reject(err);
      }
      var ds=this;
      var responseTransform = function(result)
      {
        //排序
        if(tag_values_query)
        {
          //console.log(tag_values_query)
          var keysArray = tag_values_query[2].split(",").map(function(key) {
            return key.trim();
          });
          var key = keysArray[0];
          if(key==='index')
          {
            if(tag_values_query[1]==='env.air')
            {
              /*for(let i=0;i<result.length;i++)
              {
                let item=result[i];
                let index=ds.air.indexOf(item);

                result.splice(i,1);
                result.splice()
              }*/
              result=ds.air;

            }else if(tag_values_query[1]==='env.gas')
            {
              result=ds.gas;
            }else if(tag_values_query[1]==='env.water')
            {
              result=ds.water;
            }
          }
          if(key==='host')
          {
            if(options)
            {
              //console.info(options.variable.cnData);
              var hostMap={};
              _.map(options.variable.cnData,function (item) {
                hostMap[item.key]=item.name;
                return {item};
              });
              return _.map(result, function(value) {
                return {text: value,cn:hostMap[value]};
              });
            }

          }
          if(key==='source')
          {

            if(options)
            {
              //console.info(options.variable.cnData);
              var hostMap={};
              _.map(options.variable.cnData,function (item) {
                hostMap[item.key]=item.name;
                return {item};
              });
              return _.map(result, function(value) {
                if(tag_values_query[1]==='env.air.beichen'&&key=='source'&&value=='private')
                  return {text: value,cn:'空气网格化监测系统'};
                if(tag_values_query[1]==='env.power.beichen'&&key=='source'&&value=='company')
                  return {text: value,cn:'重点企业电力电量负荷监测系统'};
                return {text: value,cn:ds.cnMap[value]};
                return {text: value,cn:hostMap[value]};
              });
            }

          }

        }

        return _.map(result, function(value) {
          return {text: value,cn:ds.cnMap[value]};
        });
      };

      var metrics_regex = /metrics\((.*)\)/;
      var tag_names_regex = /tag_names\((.*)\)/;
      var tag_values_regex = /tag_values\((.*?),\s?(.*)\)/;
      var tag_names_suggest_regex = /suggest_tagk\((.*)\)/;
      var tag_values_suggest_regex = /suggest_tagv\((.*)\)/;



      var metrics_query = interpolated.match(metrics_regex);
      //console.info(metrics_query);
      if (metrics_query) {
        return this._performSuggestQuery(metrics_query[1], 'metrics').then(responseTransform);
      }

      var tag_names_query = interpolated.match(tag_names_regex);
      if (tag_names_query) {
        return this._performMetricKeyLookup(tag_names_query[1]).then(responseTransform);
      }

      var tag_values_query = interpolated.match(tag_values_regex);
      //console.info(interpolated);
      console.info(tag_values_query);
      if (tag_values_query) {
        return this._performMetricKeyValueLookup(tag_values_query[1], tag_values_query[2]).then(responseTransform);
      }

      var tag_names_suggest_query = interpolated.match(tag_names_suggest_regex);
      if (tag_names_suggest_query) {
        return this._performSuggestQuery(tag_names_suggest_query[1], 'tagk').then(responseTransform);
      }

      var tag_values_suggest_query = interpolated.match(tag_values_suggest_regex);
      if (tag_values_suggest_query) {
        return this._performSuggestQuery(tag_values_suggest_query[1], 'tagv').then(responseTransform);
      }

      return $q.when([]);
    };

    this.testDatasource = function() {
      return this._performSuggestQuery('cpu', 'metrics').then(function () {
        return { status: "success", message: "Data source is working" };
      });
    };

    var aggregatorsPromise = null;
    this.getAggregators = function() {
      if (aggregatorsPromise) { return aggregatorsPromise; }

      aggregatorsPromise = this._get('/api/aggregators').then(function(result) {
        if (result.data && _.isArray(result.data)) {
          return result.data.sort();
        }
        return [];
      });
      return aggregatorsPromise;
    };

    var filterTypesPromise = null;
    this.getFilterTypes = function() {
      if (filterTypesPromise) { return filterTypesPromise; }

      filterTypesPromise = this._get('/api/config/filters').then(function(result) {
        if (result.data) {
          return Object.keys(result.data).sort();
        }
        return [];
      });
      return filterTypesPromise;
    };

    function transformMetricData(md, groupByTags, target, options, tsdbResolution) {
      var metricLabel = createMetricLabel(md, target, groupByTags, options);
      var dps = [];

      // TSDB returns datapoints has a hash of ts => value.
      // Can't use _.pairs(invert()) because it stringifies keys/values
      _.each(md.dps, function (v, k) {
        if (tsdbResolution === 2) {
          dps.push([v, k * 1]);
        } else {
          dps.push([v, k * 1000]);
        }
      });

      return { target: metricLabel, datapoints: dps };
    }

    function createMetricLabel(md, target, groupByTags, options) {
      if (target.alias) {
        var scopedVars = _.clone(options.scopedVars || {});
        _.each(md.tags, function(value, key) {
          scopedVars['tag_' + key] = {value: value};
        });
        return templateSrv.replace(target.alias, scopedVars);
      }

      var label = md.metric;
      var tagData = [];

      if (!_.isEmpty(md.tags)) {
        _.each(_.toPairs(md.tags), function(tag) {
          if (_.has(groupByTags, tag[0])) {
            tagData.push(tag[0] + "=" + tag[1]);
          }
        });
      }

      if (!_.isEmpty(tagData)) {
        label += "{" + tagData.join(", ") + "}";
      }

      return label;
    }

    function convertTargetToQuery(target, options, tsdbVersion) {
      if (!target.metric || target.hide) {
        return null;
      }

      var query = {
        metric: templateSrv.replace(target.metric, options.scopedVars, 'pipe'),
        aggregator: "avg"
      };

      if (target.aggregator) {
        query.aggregator = templateSrv.replace(target.aggregator);
      }

      if (target.shouldComputeRate) {
        query.rate = true;
        query.rateOptions = {
          counter: !!target.isCounter
        };

        if (target.counterMax && target.counterMax.length) {
          query.rateOptions.counterMax = parseInt(target.counterMax);
        }

        if (target.counterResetValue && target.counterResetValue.length) {
          query.rateOptions.resetValue = parseInt(target.counterResetValue);
        }

        if(tsdbVersion >= 2) {
          query.rateOptions.dropResets = !query.rateOptions.counterMax &&
                (!query.rateOptions.ResetValue || query.rateOptions.ResetValue === 0);
        }
      }

      if (!target.disableDownsampling) {
        var interval =  templateSrv.replace(target.downsampleInterval || options.interval);

        if (interval.match(/\.[0-9]+s/)) {
          interval = parseFloat(interval)*1000 + "ms";
        }

        query.downsample = interval + "-" + target.downsampleAggregator;

        if (target.downsampleFillPolicy && target.downsampleFillPolicy !== "none") {
          query.downsample += "-" + target.downsampleFillPolicy;
        }
      }

      if (target.filters && target.filters.length > 0) {
        query.filters = angular.copy(target.filters);
        if (query.filters){
          for (var filter_key in query.filters) {
            query.filters[filter_key].filter = templateSrv.replace(query.filters[filter_key].filter, options.scopedVars, 'pipe');
          }
        }
      } else {
        query.tags = angular.copy(target.tags);
        if (query.tags){
          for (var tag_key in query.tags) {
            query.tags[tag_key] = templateSrv.replace(query.tags[tag_key], options.scopedVars, 'pipe');
          }
        }
      }

      if (target.explicitTags) {
        query.explicitTags = true;
      }

      return query;
    }

    function mapMetricsToTargets(metrics, options, tsdbVersion) {
      var interpolatedTagValue, arrTagV;
      return _.map(metrics, function(metricData) {
        if (tsdbVersion === 3) {
          return metricData.query.index;
        } else {
          return _.findIndex(options.targets, function(target) {
            if (target.filters && target.filters.length > 0) {
              return target.metric === metricData.metric;
            } else {
              return target.metric === metricData.metric &&
              _.every(target.tags, function(tagV, tagK) {
                interpolatedTagValue = templateSrv.replace(tagV, options.scopedVars, 'pipe');
                arrTagV = interpolatedTagValue.split('|');
                return _.includes(arrTagV, metricData.tags[tagK]) || interpolatedTagValue === "*";
              });
            }
          });
        }
      });
    }

    function convertToTSDBTime(date, roundUp) {
      if (date === 'now') {
        return null;
      }

      date = dateMath.parse(date, roundUp);
      return date.valueOf();
    }
  }

  return OpenTsDatasource;
});
