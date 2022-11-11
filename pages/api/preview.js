export default function handler(req, res) {
  const { secret, productId } = req.query

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !productId) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  res.setPreviewData({})
  res.redirect(`/product/${productId}`)
}