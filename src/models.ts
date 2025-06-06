/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Code generated by the Google Gen AI SDK generator DO NOT EDIT.

import {ApiClient} from './_api_client';
import * as common from './_common';
import {BaseModule} from './_common';
import * as converters from './converters/_models_converters';
import * as types from './types';

export class Models extends BaseModule {
  constructor(private readonly apiClient: ApiClient) {
    super();
  }

  /**
   * Makes an API request to generate content with a given model.
   *
   * For the `model` parameter, supported formats for Vertex AI API include:
   * - The Gemini model ID, for example: 'gemini-2.0-flash'
   * - The full resource name starts with 'projects/', for example:
   *  'projects/my-project-id/locations/us-central1/publishers/google/models/gemini-2.0-flash'
   * - The partial resource name with 'publishers/', for example:
   *  'publishers/google/models/gemini-2.0-flash' or
   *  'publishers/meta/models/llama-3.1-405b-instruct-maas'
   * - `/` separated publisher and model name, for example:
   * 'google/gemini-2.0-flash' or 'meta/llama-3.1-405b-instruct-maas'
   *
   * For the `model` parameter, supported formats for Gemini API include:
   * - The Gemini model ID, for example: 'gemini-2.0-flash'
   * - The model name starts with 'models/', for example:
   *  'models/gemini-2.0-flash'
   * - For tuned models, the model name starts with 'tunedModels/',
   * for example:
   * 'tunedModels/1234567890123456789'
   *
   * Some models support multimodal input and output.
   *
   * @param params - The parameters for generating content.
   * @return The response from generating content.
   *
   * @example
   * ```ts
   * const response = await ai.models.generateContent({
   *   model: 'gemini-2.0-flash',
   *   contents: 'why is the sky blue?',
   *   config: {
   *     candidateCount: 2,
   *   }
   * });
   * console.log(response);
   * ```
   */
  generateContent = async (
    params: types.GenerateContentParameters,
  ): Promise<types.GenerateContentResponse> => {
    return await this.generateContentInternal(params);
  };

  /**
   * Makes an API request to generate content with a given model and yields the
   * response in chunks.
   *
   * For the `model` parameter, supported formats for Vertex AI API include:
   * - The Gemini model ID, for example: 'gemini-2.0-flash'
   * - The full resource name starts with 'projects/', for example:
   *  'projects/my-project-id/locations/us-central1/publishers/google/models/gemini-2.0-flash'
   * - The partial resource name with 'publishers/', for example:
   *  'publishers/google/models/gemini-2.0-flash' or
   *  'publishers/meta/models/llama-3.1-405b-instruct-maas'
   * - `/` separated publisher and model name, for example:
   * 'google/gemini-2.0-flash' or 'meta/llama-3.1-405b-instruct-maas'
   *
   * For the `model` parameter, supported formats for Gemini API include:
   * - The Gemini model ID, for example: 'gemini-2.0-flash'
   * - The model name starts with 'models/', for example:
   *  'models/gemini-2.0-flash'
   * - For tuned models, the model name starts with 'tunedModels/',
   * for example:
   *  'tunedModels/1234567890123456789'
   *
   * Some models support multimodal input and output.
   *
   * @param params - The parameters for generating content with streaming response.
   * @return The response from generating content.
   *
   * @example
   * ```ts
   * const response = await ai.models.generateContentStream({
   *   model: 'gemini-2.0-flash',
   *   contents: 'why is the sky blue?',
   *   config: {
   *     maxOutputTokens: 200,
   *   }
   * });
   * for await (const chunk of response) {
   *   console.log(chunk);
   * }
   * ```
   */
  generateContentStream = async (
    params: types.GenerateContentParameters,
  ): Promise<AsyncGenerator<types.GenerateContentResponse>> => {
    return await this.generateContentStreamInternal(params);
  };

  /**
   * Generates an image based on a text description and configuration.
   *
   * @param model - The model to use.
   * @param prompt - A text description of the image to generate.
   * @param [config] - The config for image generation.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await client.models.generateImages({
   *  model: 'imagen-3.0-generate-002',
   *  prompt: 'Robot holding a red skateboard',
   *  config: {
   *    numberOfImages: 1,
   *    includeRaiReason: true,
   *  },
   * });
   * console.log(response?.generatedImages?.[0]?.image?.imageBytes);
   * ```
   */
  generateImages = async (
    params: types.GenerateImagesParameters,
  ): Promise<types.GenerateImagesResponse> => {
    return await this.generateImagesInternal(params).then((apiResponse) => {
      let positivePromptSafetyAttributes;
      const generatedImages = [];

      if (apiResponse?.generatedImages) {
        for (const generatedImage of apiResponse.generatedImages) {
          if (
            generatedImage &&
            generatedImage?.safetyAttributes &&
            generatedImage?.safetyAttributes?.contentType === 'Positive Prompt'
          ) {
            positivePromptSafetyAttributes = generatedImage?.safetyAttributes;
          } else {
            generatedImages.push(generatedImage);
          }
        }
      }
      let response: types.GenerateImagesResponse;

      if (positivePromptSafetyAttributes) {
        response = {
          generatedImages: generatedImages,
          positivePromptSafetyAttributes: positivePromptSafetyAttributes,
        };
      } else {
        response = {
          generatedImages: generatedImages,
        };
      }
      return response;
    });
  };

  private async generateContentInternal(
    params: types.GenerateContentParameters,
  ): Promise<types.GenerateContentResponse> {
    let response: Promise<types.GenerateContentResponse>;
    let path: string = '';
    let queryParams: Record<string, string> = {};
    if (this.apiClient.isVertexAI()) {
      const body = converters.generateContentParametersToVertex(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:generateContent',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.GenerateContentResponse>;

      return response.then((apiResponse) => {
        const resp = converters.generateContentResponseFromVertex(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.GenerateContentResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = converters.generateContentParametersToMldev(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:generateContent',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.GenerateContentResponse>;

      return response.then((apiResponse) => {
        const resp = converters.generateContentResponseFromMldev(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.GenerateContentResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }

  private async generateContentStreamInternal(
    params: types.GenerateContentParameters,
  ): Promise<AsyncGenerator<types.GenerateContentResponse>> {
    let response: Promise<AsyncGenerator<types.HttpResponse>>;
    let path: string = '';
    let queryParams: Record<string, string> = {};
    if (this.apiClient.isVertexAI()) {
      const body = converters.generateContentParametersToVertex(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:streamGenerateContent?alt=sse',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      const apiClient = this.apiClient;
      response = apiClient.requestStream({
        path: path,
        queryParams: queryParams,
        body: JSON.stringify(body),
        httpMethod: 'POST',
        httpOptions: params.config?.httpOptions,
        abortSignal: params.config?.abortSignal,
      }) as Promise<AsyncGenerator<types.HttpResponse>>;

      return response.then(async function* (
        apiResponse: AsyncGenerator<types.HttpResponse>,
      ) {
        for await (const chunk of apiResponse) {
          const resp = converters.generateContentResponseFromVertex(
            apiClient,
            (await chunk.json()) as types.GenerateContentResponse,
          );
          const typedResp = new types.GenerateContentResponse();
          Object.assign(typedResp, resp);
          yield typedResp;
        }
      });
    } else {
      const body = converters.generateContentParametersToMldev(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:streamGenerateContent?alt=sse',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      const apiClient = this.apiClient;
      response = apiClient.requestStream({
        path: path,
        queryParams: queryParams,
        body: JSON.stringify(body),
        httpMethod: 'POST',
        httpOptions: params.config?.httpOptions,
        abortSignal: params.config?.abortSignal,
      }) as Promise<AsyncGenerator<types.HttpResponse>>;

      return response.then(async function* (
        apiResponse: AsyncGenerator<types.HttpResponse>,
      ) {
        for await (const chunk of apiResponse) {
          const resp = converters.generateContentResponseFromMldev(
            apiClient,
            (await chunk.json()) as types.GenerateContentResponse,
          );
          const typedResp = new types.GenerateContentResponse();
          Object.assign(typedResp, resp);
          yield typedResp;
        }
      });
    }
  }

  /**
   * Calculates embeddings for the given contents. Only text is supported.
   *
   * @param params - The parameters for embedding contents.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await ai.models.embedContent({
   *  model: 'text-embedding-004',
   *  contents: [
   *    'What is your name?',
   *    'What is your favorite color?',
   *  ],
   *  config: {
   *    outputDimensionality: 64,
   *  },
   * });
   * console.log(response);
   * ```
   */
  async embedContent(
    params: types.EmbedContentParameters,
  ): Promise<types.EmbedContentResponse> {
    let response: Promise<types.EmbedContentResponse>;
    let path: string = '';
    let queryParams: Record<string, string> = {};
    if (this.apiClient.isVertexAI()) {
      const body = converters.embedContentParametersToVertex(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:predict',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.EmbedContentResponse>;

      return response.then((apiResponse) => {
        const resp = converters.embedContentResponseFromVertex(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.EmbedContentResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = converters.embedContentParametersToMldev(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:batchEmbedContents',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.EmbedContentResponse>;

      return response.then((apiResponse) => {
        const resp = converters.embedContentResponseFromMldev(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.EmbedContentResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }

  /**
   * Generates an image based on a text description and configuration.
   *
   * @param params - The parameters for generating images.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await ai.models.generateImages({
   *  model: 'imagen-3.0-generate-002',
   *  prompt: 'Robot holding a red skateboard',
   *  config: {
   *    numberOfImages: 1,
   *    includeRaiReason: true,
   *  },
   * });
   * console.log(response?.generatedImages?.[0]?.image?.imageBytes);
   * ```
   */
  private async generateImagesInternal(
    params: types.GenerateImagesParameters,
  ): Promise<types.GenerateImagesResponse> {
    let response: Promise<types.GenerateImagesResponse>;
    let path: string = '';
    let queryParams: Record<string, string> = {};
    if (this.apiClient.isVertexAI()) {
      const body = converters.generateImagesParametersToVertex(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:predict',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.GenerateImagesResponse>;

      return response.then((apiResponse) => {
        const resp = converters.generateImagesResponseFromVertex(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.GenerateImagesResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = converters.generateImagesParametersToMldev(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:predict',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.GenerateImagesResponse>;

      return response.then((apiResponse) => {
        const resp = converters.generateImagesResponseFromMldev(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.GenerateImagesResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }

  /**
   * Fetches information about a model by name.
   *
   * @example
   * ```ts
   * const modelInfo = await ai.models.get({model: 'gemini-2.0-flash'});
   * ```
   */
  async get(params: types.GetModelParameters): Promise<types.Model> {
    let response: Promise<types.Model>;
    let path: string = '';
    let queryParams: Record<string, string> = {};
    if (this.apiClient.isVertexAI()) {
      const body = converters.getModelParametersToVertex(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{name}',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'GET',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.Model>;

      return response.then((apiResponse) => {
        const resp = converters.modelFromVertex(this.apiClient, apiResponse);

        return resp as types.Model;
      });
    } else {
      const body = converters.getModelParametersToMldev(this.apiClient, params);
      path = common.formatMap(
        '{name}',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'GET',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.Model>;

      return response.then((apiResponse) => {
        const resp = converters.modelFromMldev(this.apiClient, apiResponse);

        return resp as types.Model;
      });
    }
  }

  /**
   * Counts the number of tokens in the given contents. Multimodal input is
   * supported for Gemini models.
   *
   * @param params - The parameters for counting tokens.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await ai.models.countTokens({
   *  model: 'gemini-2.0-flash',
   *  contents: 'The quick brown fox jumps over the lazy dog.'
   * });
   * console.log(response);
   * ```
   */
  async countTokens(
    params: types.CountTokensParameters,
  ): Promise<types.CountTokensResponse> {
    let response: Promise<types.CountTokensResponse>;
    let path: string = '';
    let queryParams: Record<string, string> = {};
    if (this.apiClient.isVertexAI()) {
      const body = converters.countTokensParametersToVertex(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:countTokens',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.CountTokensResponse>;

      return response.then((apiResponse) => {
        const resp = converters.countTokensResponseFromVertex(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.CountTokensResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = converters.countTokensParametersToMldev(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:countTokens',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.CountTokensResponse>;

      return response.then((apiResponse) => {
        const resp = converters.countTokensResponseFromMldev(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.CountTokensResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }

  /**
   * Given a list of contents, returns a corresponding TokensInfo containing
   * the list of tokens and list of token ids.
   *
   * This method is not supported by the Gemini Developer API.
   *
   * @param params - The parameters for computing tokens.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await ai.models.computeTokens({
   *  model: 'gemini-2.0-flash',
   *  contents: 'What is your name?'
   * });
   * console.log(response);
   * ```
   */
  async computeTokens(
    params: types.ComputeTokensParameters,
  ): Promise<types.ComputeTokensResponse> {
    let response: Promise<types.ComputeTokensResponse>;
    let path: string = '';
    let queryParams: Record<string, string> = {};
    if (this.apiClient.isVertexAI()) {
      const body = converters.computeTokensParametersToVertex(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:computeTokens',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.ComputeTokensResponse>;

      return response.then((apiResponse) => {
        const resp = converters.computeTokensResponseFromVertex(
          this.apiClient,
          apiResponse,
        );
        const typedResp = new types.ComputeTokensResponse();
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      throw new Error('This method is only supported by the Vertex AI.');
    }
  }

  /**
   *  Generates videos based on a text description and configuration.
   *
   * @param params - The parameters for generating videos.
   * @return A Promise<GenerateVideosOperation> which allows you to track the progress and eventually retrieve the generated videos using the operations.get method.
   *
   * @example
   * ```ts
   * const operation = await ai.models.generateVideos({
   *  model: 'veo-2.0-generate-001',
   *  prompt: 'A neon hologram of a cat driving at top speed',
   *  config: {
   *    numberOfVideos: 1
   * });
   *
   * while (!operation.done) {
   *   await new Promise(resolve => setTimeout(resolve, 10000));
   *   operation = await ai.operations.getVideosOperation({operation: operation});
   * }
   *
   * console.log(operation.response?.generatedVideos?.[0]?.video?.uri);
   * ```
   */

  async generateVideos(
    params: types.GenerateVideosParameters,
  ): Promise<types.GenerateVideosOperation> {
    let response: Promise<types.GenerateVideosOperation>;
    let path: string = '';
    let queryParams: Record<string, string> = {};
    if (this.apiClient.isVertexAI()) {
      const body = converters.generateVideosParametersToVertex(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:predictLongRunning',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.GenerateVideosOperation>;

      return response.then((apiResponse) => {
        const resp = converters.generateVideosOperationFromVertex(
          this.apiClient,
          apiResponse,
        );

        return resp as types.GenerateVideosOperation;
      });
    } else {
      const body = converters.generateVideosParametersToMldev(
        this.apiClient,
        params,
      );
      path = common.formatMap(
        '{model}:predictLongRunning',
        body['_url'] as Record<string, unknown>,
      );
      queryParams = body['_query'] as Record<string, string>;
      delete body['config'];
      delete body['_url'];
      delete body['_query'];

      response = this.apiClient
        .request({
          path: path,
          queryParams: queryParams,
          body: JSON.stringify(body),
          httpMethod: 'POST',
          httpOptions: params.config?.httpOptions,
          abortSignal: params.config?.abortSignal,
        })
        .then((httpResponse) => {
          return httpResponse.json();
        }) as Promise<types.GenerateVideosOperation>;

      return response.then((apiResponse) => {
        const resp = converters.generateVideosOperationFromMldev(
          this.apiClient,
          apiResponse,
        );

        return resp as types.GenerateVideosOperation;
      });
    }
  }
}
