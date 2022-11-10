import * as contentful from "contentful"

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

export default function ProductPage(props) {

  if(props.error) {
    return (
      <div>
        <h1>An Error occurred: </h1>
        <h2>{props.error}</h2>
      </div>
    )
  }

  return (
    <div>
      <h1>{props.heading}</h1>
      <h2>{props.subheading}</h2>
    </div>
  )
}

export async function getStaticPaths() {

  const products = await client
    .getEntries({
      content_type: 'productReview',
    })

  const paths = products.items.map(product => ({
    params: {
      slug: product.fields.productId
    }
  }))

  return {
    fallback: false,
    paths
  }
}

export async function getStaticProps(context) {

  const product = await client
    .getEntries({
      content_type: 'productReview',
      limit: 1,
      "fields.productId": context.params.slug,
    })

  return {
    props: {
      error: !product.items.length
        && `No product with id: ${context.params.slug}`,
      ...product?.items?.[0].fields
    }
  }
}