import React, { useContext, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import {
  Typography,
  Card,
  CardContent,
  Container,
  CircularProgress,
  List,
  FormControl,
  Select,
} from '@material-ui/core'
import { LayoutContext } from './layout'
import App from './app'

const noss = [
  '',
  null,
  'https://github.com/zincwork/contracts',
  'https://github.com/kkomaz/debut',
  'https://github.com/springrole',
  'https://github.com/dmailonline',
  'https://github.com/blockcred',
  'https://github.com/blackholeorganization',
  'https://github.com/danparamov/mila-crm',
  'https://github.com/KevinNTH',
  'https://gitlab.com/trovenow',
]

const ReviewAppsSuggestions = () => {
  const { isSignedIn, checking } = useContext(LayoutContext)
  const [sort, setSort] = useState('popular')
  const data = useStaticQuery(graphql`
    query appSuggestions {
      allApps(sort: { fields: [lifetimeEarnings], order: [DESC] }) {
        edges {
          node {
            ...AppInformation
            ...AppIcon
          }
        }
      }
      allAppminingresultsforauditXlsxAugust19(
        filter: { Final_Score: { ne: null } }
        sort: { fields: [Final_Score], order: [DESC] }
      ) {
        totalCount
        edges {
          node {
            App_ID: App_Id
            Final_Score
            PH_Theta
            TMUI_Theta
            NIL_Theta
            Awario_Theta
          }
        }
      }
    }
  `)

  if (!isSignedIn) {
    return null
  } else {
    let appList

    if (sort === 'popular') {
      appList = data.allApps.edges
        .filter(e => [216, 945, 174].includes(e.node.appcoid))
        .map(e => e.node)
    } else if (sort === 'usable') {
      const topUsable = data.allAppminingresultsforauditXlsxAugust19.edges
        .sort((a, b) => b.node.TMUI_Theta - a.node.TMUI_Theta)
        .slice(0, 3)
        .map(e => e.node.App_ID)
      appList = data.allApps.edges
        .filter(e => topUsable.includes(String(e.node.appcoid)))
        .map(e => e.node)
    } else if (sort === 'best') {
      const best = data.allAppminingresultsforauditXlsxAugust19.edges
        .sort((a, b) => b.node.Final_Score - a.node.Final_Score)
        .slice(0, 3)
        .map(e => e.node.App_ID)
      appList = data.allApps.edges
        .filter(e => best.includes(String(e.node.appcoid)))
        .map(e => e.node)
    } else if (sort === 'foss') {
      appList = data.allApps.edges
        .filter(e => !noss.includes(e.node.openSourceUrl))
        .map(e => e.node)
    } else if (sort === 'noss') {
      appList = data.allApps.edges
        .filter(e => noss.includes(e.node.openSourceUrl))
        .map(e => e.node)
    } else if (sort === 'top') {
      appList = data.allApps.edges.map(e => e.node)
    } else if (sort === 'random') {
      const items = data.allApps.edges
      appList = [
        items[Math.floor(Math.random() * items.length)],
        items[Math.floor(Math.random() * items.length)],
        items[Math.floor(Math.random() * items.length)],
      ].map(e => e.node)
    } else {
      throw new Error('Invalid sort value ' + sort)
    }

    return (
      <Card style={{ margin: 4 }}>
        <CardContent>
          <Container align="center">
            {!checking && (
              <>
                <Typography variant="h5">Review some of these apps</Typography>
                <FormControl>
                  <Typography component="span" variant="body1">
                    The{' '}
                    <Select
                      native
                      value={sort}
                      onChange={e => setSort(e.target.value)}
                      inputProps={{
                        name: 'sort',
                      }}
                    >
                      <option value={'popular'}>most popular</option>
                      <option value={'best'}>best reviewed</option>
                      <option value={'usable'}>most usable</option>
                      <option value={'top'}>top</option>
                      <option value={'foss'}>open sourced</option>
                      <option value={'noss'}>close sourced</option>
                      <option value={'random'}>randomly chosen</option>
                    </Select>{' '}
                    apps
                  </Typography>
                </FormControl>
              </>
            )}
            {checking && <CircularProgress size={36} />}
          </Container>
          {!checking && (
            <List>
              {appList.slice(0, 3).map(function(d, idx) {
                return (
                  <App
                    key={d.appcoid}
                    data={d}
                    showSourceLink={false}
                    hideRewards
                  />
                )
              })}
            </List>
          )}
        </CardContent>
      </Card>
    )
  }
}

export default ReviewAppsSuggestions
