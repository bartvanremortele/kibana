/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { buildAnnotationRequest } from './build_request_body';
import { getEsShardTimeout } from '../helpers/get_es_shard_timeout';
import { getIndexPatternObject } from '../helpers/get_index_pattern';

export async function getAnnotationRequestParams(req, panel, annotation, esQueryConfig, capabilities) {
  const esShardTimeout = await getEsShardTimeout(req);
  const indexPattern = annotation.index_pattern;
  const { indexPatternObject, indexPatternString } = await getIndexPatternObject(req, indexPattern);
  const request = buildAnnotationRequest(req, panel, annotation, esQueryConfig, indexPatternObject, capabilities);

  return {
    index: indexPatternString,
    body: {
      ...request,
      timeout: esShardTimeout > 0 ? `${esShardTimeout}ms` : undefined,
    },
  };
}