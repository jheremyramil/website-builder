<?php

namespace App\Traits;

trait ApiResponses
{
    /**
     * Generic success response.
     */
    protected function success($data = [], $message = 'Success', $statusCode = 200)
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'statusCode' => $statusCode,
        ], $statusCode);
    }

    /**
     * Generic error response.
     */
    protected function error($data = [], $message = 'Error', $statusCode = 400)
    {
        return response()->json([
            'message' => $message,
            'statusCode' => $statusCode,
            'data' => $data,
        ], $statusCode);
    }
}
