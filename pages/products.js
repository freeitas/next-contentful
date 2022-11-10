import * as contentful from "contentful"

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

export default function ProductPage(props) {
  return (
    <div>
      <h1>{props.heading}</h1>
      <h2>{props.subheading}</h2>
    </div>
  )
}

export async function getStaticProps() {

  const product = await client.getEntry('6K6Zfs9G8zKv5IFl6MBQPB')

  return {
    props: {
      ...product.fields
    }
  }
}