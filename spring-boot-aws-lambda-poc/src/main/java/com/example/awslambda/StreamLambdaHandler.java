package com.example.awslambda;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.model.HttpApiV2ProxyRequest;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * AWS Lambda entry point. API Gateway (proxy integration) sends HTTP as a JSON event stream;
 * this handler forwards it to the Spring Boot servlet stack via Serverless Java Container.
 * <p>
 * The handler instance is initialized once per Lambda execution environment (warm starts reuse it).
 * <p>
 * SAM {@code HttpApi} uses API Gateway's <strong>HTTP API v2 proxy</strong> payload; use
 * {@link SpringBootLambdaContainerHandler#getHttpApiV2ProxyHandler(Class)} (not {@code getAwsProxyHandler},
 * which targets REST API v1 proxy events).
 */
public class StreamLambdaHandler implements RequestStreamHandler {

    private static final SpringBootLambdaContainerHandler<HttpApiV2ProxyRequest, AwsProxyResponse> HANDLER;

    static {
        try {
            HANDLER = SpringBootLambdaContainerHandler.getHttpApiV2ProxyHandler(AwsLambdaSpringPocApplication.class);
        } catch (ContainerInitializationException e) {
            throw new IllegalStateException("Could not initialize Spring Boot application for Lambda", e);
        }
    }

    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        HANDLER.proxyStream(input, output, context);
    }
}
