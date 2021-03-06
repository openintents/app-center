import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  Container,
} from '@material-ui/core'
import Rating from 'material-ui-rating'
import BlockstackProfile from './blockstackProfile'

const UserCommentDialog = ({
  userUpdate,
  showUpdateDialog,
  updating,
  rating,
  handleCloseUpdate,
  handleChangeText,
  handleChangeRating,
  postComment,
  modal,
  isSignedIn,
  loadingUser,
}) => {
  return (
    <Dialog
      disableBackdropClick={modal}
      disableEscapeKeyDown={modal}
      open={showUpdateDialog}
      onClose={() => handleCloseUpdate()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Review</DialogTitle>
      <DialogContent>
        {loadingUser && (
          <Container align="center">
            <CircularProgress size={64} />
            <DialogContentText>Stacking blocks...</DialogContentText>
          </Container>
        )}
        {!loadingUser && (
          <>
            <DialogContentText>
              {!isSignedIn && (
                <>
                  Your review will be secured with your Blockstack ID. You will
                  always be in control of your comments and ratings.
                </>
              )}
              {(!modal || isSignedIn) && (
                <>
                  Rating and comments can be published to either all users
                  publicly or kept privately.
                </>
              )}
            </DialogContentText>

            {!isSignedIn && <BlockstackProfile variant="blue" redirectToHere />}
            {(!modal || isSignedIn) && (
              <>
                <Rating
                  onChange={value => handleChangeRating(value)}
                  value={rating}
                />
                {rating === 0 && (
                  <DialogContentText>
                    <small>
                      Your review will be more helpful with a rating.
                    </small>
                  </DialogContentText>
                )}
                <TextField
                  margin="normal"
                  id="userUpdate"
                  type="text"
                  fullWidth
                  multiline
                  rows="3"
                  helperText="What do you like or dislike?"
                  variant="outlined"
                  value={userUpdate}
                  onChange={e => handleChangeText(e)}
                />
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {updating && <CircularProgress size={24} />}

        <Button onClick={() => handleCloseUpdate()} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => postComment({ visibility: 'private' })}
          color="secondary"
        >
          Save draft
        </Button>
        <Button
          onClick={() => postComment({ visibililty: 'public' })}
          color="primary"
        >
          Post publicly
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserCommentDialog
