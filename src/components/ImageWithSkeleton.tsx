import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import ImageNotSupportedOutlined from '@mui/icons-material/ImageNotSupportedOutlined';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  /** Height of the image frame: a number, or one value per breakpoint */
  height: number | { xs?: number; sm?: number; md?: number };
  /** Set for above-the-fold images so the browser loads them first */
  priority?: boolean;
}

/**
 * Image with a loading skeleton and an error fallback.
 *
 * - While the image downloads: a shimmering skeleton fills the frame
 * - When it loads: the image fades in
 * - If it fails (or `src` is empty): an icon is shown instead
 */
export default function ImageWithSkeleton({
  src,
  alt,
  height,
  priority = false,
}: ImageWithSkeletonProps) {
  // Remember WHICH src finished, so a new src automatically starts as "loading"
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const failed = !src || failedSrc === src;
  const loaded = loadedSrc === src;

  return (
    <Box sx={{ position: 'relative', height, overflow: 'hidden' }}>
      {!loaded && !failed && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: 'absolute', inset: 0, height: '100%' }}
        />
      )}

      {failed ? (
        <Box
          role="img"
          aria-label={alt}
          data-testid="image-fallback"
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.hover',
            color: 'text.secondary',
          }}
        >
          <ImageNotSupportedOutlined fontSize="large" />
        </Box>
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
      )}
    </Box>
  );
}
