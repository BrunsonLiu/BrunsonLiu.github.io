import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',  // 静态导出
  images: {
    unoptimized: true,  // GitHub Pages 不支持图片优化
  },
};

export default withMDX(nextConfig);
