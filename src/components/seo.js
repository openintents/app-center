import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import favicon from '../images/favicon.ico'
import appleTouchIcon from '../images/apple-touch-icon.png'
import favicon32x32 from '../images/favicon-32x32.png'
import favicon16x16 from '../images/favicon-16x16.png'
import safariPinnedTab from '../images/safari-pinned-tab.svg'

function SEO({ description, lang, meta, keywords, title }) {
  const siteMetaData = useSiteMetaData()
  const metaDescription = description || siteMetaData.description
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetaData.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMetaData.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: 'msapplication-TileColor',
          content: '#da532c',
        },
        { name: 'theme-color', content: '#ffffff' },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
      link={[
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          sizes: '180x180',
          href: `${appleTouchIcon}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: `${favicon32x32}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: `${favicon16x16}`,
        },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        {
          rel: 'mask-icon',
          type: 'image/svg',
          href: `${safariPinnedTab}`,
          color: '#5bbad5',
        },
        {
          rel: 'msapplication-TileColor',
          type: 'image/ico',
          href: `${favicon}`,
        },
        { rel: 'shortcut icon', type: 'image/ico', href: `${favicon}` },
      ]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const useSiteMetaData = () => {
  const { site } = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)
  return site.siteMetadata
}
