import React from 'react'
import { Link } from 'gatsby'

import {
  Typography,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Note'
import AppsIcon from '@material-ui/icons/Apps'
import { styles } from './layout'
import BlockstackProfile from './blockstackProfile'

export default () => {
  return (
    <Card style={{ margin: 4 }}>
      <CardHeader avatar={<BlockstackProfile />} />
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CommentIcon style={styles.smallIcon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography>
                <Link to="/data/#comments">
                  <b>Manage your comments</b>
                </Link>{' '}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AppsIcon style={styles.smallIcon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link to="/data/#apps">
                  <b>Manage your apps</b>
                </Link>
              }
              secondary="(For app publishers only)"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
