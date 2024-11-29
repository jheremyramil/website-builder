<?php

namespace App\Traits;

trait ApiResponses
{
    /**
     * Generic API response.
     */
    protected function respond($data = [], $message = '', $statusCode = 200, $wrapData = true)
    {
        $response = [
            'message' => $message,
            'statusCode' => $statusCode,
        ];

        if ($wrapData) {
            $response['data'] = $data;
        } else {
            $response = array_merge($response, $data);
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Generic success response.
     */
    protected function success($data = [], $message = 'Success', $statusCode = 200, $wrapData = true)
    {
        return $this->respond($data, $message, $statusCode, $wrapData);
    }

    /**
     * Generic error response.
     */
    protected function error($data = [], $message = 'Error', $statusCode = 400, $wrapData = true)
    {
        return $this->respond($data, $message, $statusCode, $wrapData);
    }
}
