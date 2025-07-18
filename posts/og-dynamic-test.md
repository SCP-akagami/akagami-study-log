---
title: "Dynamic OG Image Test"
date: "2025-01-19"
tags: ["Test", "OG", "Dynamic"]
---

# Dynamic OG Image Test

This article tests the dynamic OG image generation feature. Since there are no images in this article, the system should automatically generate an OG image using the API route.

## Purpose

This test verifies that:

1. When no images are present in the article, the dynamic OG image is used
2. The dynamic OG image includes the article title, date, and tags
3. The generated image displays correctly on social media platforms

## Dynamic OG Image Features

The dynamically generated OG image should include:

- **Title**: "Dynamic OG Image Test"
- **Date**: "2025-01-19"
- **Tags**: "Test", "OG", "Dynamic"
- **Background**: Gradient or solid color background
- **Typography**: Clean, readable fonts

## Expected Behavior

When this URL is shared on Discord or other social media platforms, a dynamically generated image should appear as the OG image, created via the `/api/og` endpoint.

## API Endpoint

The dynamic OG image is generated at:
```
/api/og?title=${encodeURIComponent(title)}&date=${encodeURIComponent(date)}&tags=${encodeURIComponent(tags.join(','))}
```

## Test Instructions

1. Share this URL on Discord: `https://akagami-study-log.vercel.app/posts/og-dynamic-test`
2. Verify that a generated image appears (not a loading spinner)
3. Check that the image contains the correct title, date, and tags 