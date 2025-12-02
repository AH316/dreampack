import type { Media } from '@/payload-types'

/**
 * Get the URL for a media item.
 * Always constructs URL from filename since Payload's url field may be null or incorrect.
 */
export function getMediaUrl(media: Media | null | undefined): string {
  if (!media) return ''
  if (media.filename) return `/media/${media.filename}`
  return ''
}

/**
 * Get thumbnail URL for a media item.
 */
export function getThumbnailUrl(media: Media | null | undefined): string {
  if (!media) return ''

  // Use thumbnail filename if available
  if (media.sizes?.thumbnail?.filename) return `/media/${media.sizes.thumbnail.filename}`

  // Fall back to main image
  return getMediaUrl(media)
}

/**
 * Get card-sized URL for a media item.
 */
export function getCardUrl(media: Media | null | undefined): string {
  if (!media) return ''

  // Use card filename if available
  if (media.sizes?.card?.filename) return `/media/${media.sizes.card.filename}`

  // Fall back to main image
  return getMediaUrl(media)
}
