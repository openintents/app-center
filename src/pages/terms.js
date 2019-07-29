import React from 'react'
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Grid,
  Container,
} from '@material-ui/core'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { APP_CENTER_URL } from '../components/constants'
import { graphql } from 'gatsby'

const License = ({ name, repo, children }) => {
  return (
    <Grid item xs={12} md={6}>
      <Container>
        <Typography variant="h6">
          <a href={repo}>{name}</a>
        </Typography>
        <Typography>{children}</Typography>
      </Container>
    </Grid>
  )
}
const Licenses = () => (
  <Card style={{ margin: 4 }}>
    <CardHeader
      title="Open Source Licenses"
      subheader="
          This software may contain portions of the following libraries, subject
          to the below licenses."
    />

    <CardContent>
      <Grid container>
        <License
          name={'blockstack'}
          repo="https://github.com/blockstack/blockstack.js"
        >
          MIT License
        </License>
        <License name={'react'}>MIT License</License>
      </Grid>
    </CardContent>
  </Card>
)

const Privacy = () => (
  <Card style={{ margin: 4 }}>
    <CardHeader
      title="Privacy"
      subheader="OpenIntents respects the users' privacy "
    />

    <CardContent>
      <Container>
        <Typography variant="body1">
          It is the policy of OpenIntents UG (haftungsbeschränkt) (“we”) to
          respect your privacy, and the privacy of all users of our
          applications. This Privacy Policy (the “Policy”) has been established
          to help you understand our commitment to protecting your privacy, and
          the steps we take to ensure it. This Policy was last modified on July
          29, 2019.
          <br />
          <br />
          Your privacy is very important to us and we want you to know
          everything we do and don’t do with the information you provide. Our
          guiding principle is that we collect as little information as
          necessary (and in most cases this means no information at all) and
          that any information we collect from you will be treated with the
          utmost care and respect, and every effort will be made to ensure the
          information is kept private.
          <br />
          <br />
          BY USING OR ACCESSING THE APPLICATION, YOU HEREBY ACCEPT THE POLICY
          WITHOUT QUALIFICATION. If you do not agree to this Policy, do not use
          or access OI App Center. If you have any questions about the Policy,
          please contact:
          <br />
          <br />
          support@openintents.org
          <br />
          <br />
        </Typography>
        <Typography variant="h5">What information do we collect?</Typography>
        <Typography variant="body1">
          We do not collect personal data. Our hosting service uses cookies to
          ensure the application can be served to you in the best way.
          <br />
          <br />
          Your storage provider might use cookies to ensure that you can store
          and manage your own data. This information is not transferred to us.
          <br />
          <br />
          If you contact us we store your message and contact details in order
          to resolve your request. This data is deleted once your request has
          been resolved.
          <br />
          <br />
        </Typography>
        <Typography variant="h5">
          How do we use your published content?
        </Typography>
        <Typography variant="body1">
          OI App Center allows you to create private and public reviews. Your
          private reviews are not transferred to us. Your public content is
          processed by us and might be presented to all visitors of OI App
          Center. DO NOT PUBLISH PERSONAL DATA in your reviews!
          <br />
          <br />
          If you want to have a review or all reviews been removed from OI App
          Center you can do this in the{' '}
          <a href="https://app-center.openintents.org">
            data section of OI App Center
          </a>
          . Please contact support@openintents.org if you have any problems.
        </Typography>
      </Container>
    </CardContent>
  </Card>
)
const Terms = ({ data }) => (
  <Layout>
    <SEO
      title="OI App Center"
      keywords={[`app center`, `application`, `blockstack`]}
      meta={[
        {
          name: `og:image`,
          content: `${APP_CENTER_URL}/${data.ogImage.childImageSharp.fluid.src}`,
        },
      ]}
    />
    <Privacy />
    <Licenses />
  </Layout>
)
export const query = graphql`
  query {
    ogImage: file(relativePath: { eq: "hero-img.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default Terms
