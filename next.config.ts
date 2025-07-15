import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  async headers() {
	  return [
		  {
			  source: '/(.*)',
			  headers: [
				  {
					  key: 'Content-Security-Policy',
					  value: cspHeader.replace(/\n/g, ''),
				  },
				  {
					  key: 'X-Content-Type-Options',
					  value: 'nosniff',
				  },
				  {
					  key: 'X-Frame-Options',
					  value: 'DENY',
				  },
				  {
					  key: 'Referrer-Policy',
					  value: 'origin-when-cross-origin'
				  }
			  ]
		  }
	  ]
  }
};

export default nextConfig;
