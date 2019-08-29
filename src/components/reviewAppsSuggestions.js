import React, { useContext, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import {
  Typography,
  Card,
  CardContent,
  Container,
  CircularProgress,
  List,
  InputLabel,
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
]

const ReviewAppsSuggestions = () => {
  const { isSignedIn, checking } = useContext(LayoutContext)
  const [sort, setSort] = useState('popular')
  if (!isSignedIn) {
    return null
  } else {
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

    let appList

    if (sort === 'popular') {
      appList = data.allApps.edges
        .filter(e => [216, 954, 94].includes(e.node.appcoid))
        .map(e => e.node)
    } else if (sort === 'usable') {
      const topUsable = data.allAppminingresultsforauditXlsxAugust19.edges
        .sort((a, b) => b.node.TMUI_Theta - a.node.TMUI_Theta)
        .slice(0, 3)
        .map(e => e.node.App_ID)
      appList = data.allApps.edges.filter(e =>
        topUsable.includes(e.node.appcoid)
      )
    } else if (sort === 'best') {
      const best = data.allAppminingresultsforauditXlsxAugust19.edges
        .slice(0, 3)
        .map(e => e.node.App_ID)
      appList = data.allApps.edges.filter(e => best.includes(e.node.appcoid))
    } else if (sort === 'foss') {
      appList = data.allApps.edges
        .filter(e => !noss.includes(e.node.openSourceUrl))
        .map(e => e.node)
    } else if (sort === 'noss') {
      appList = data.allApps.edges
        .filter(e => noss.includes(e.node.openSourceUrl))
        .map(e => e.node)
    } else {
      appList = data.allApps.edges.map(e => e.node)
    }
    console.log(appList)

    return (
      <Card style={{ margin: 4 }}>
        <CardContent>
          <Container align="center">
            {!checking && (
              <>
                <Typography variant="h5">Review some of these apps</Typography>
                <FormControl>
                  <Typography variant="body1">
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
