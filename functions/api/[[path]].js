// Cloudflare Pages Function to proxy API requests and add CORS headers
export async function onRequest(context) {
  const {request} = context;
  const url = new URL(request.url);

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Extract path after /api/
  const apiPath = url.pathname.replace(/^\/api/, '');
  const apiUrl = `https://api-mock.omnirev.ai${apiPath}${url.search}`;

  // Create new request with modified URL
  const modifiedRequest = new Request(apiUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.text()
        : undefined,
  });

  try {
    const response = await fetch(modifiedRequest);

    // Create new response with CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Merge existing headers with CORS headers
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
    });

    return modifiedResponse;
  } catch (error) {
    return new Response(
      JSON.stringify({error: 'API request failed', details: error.message}),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
