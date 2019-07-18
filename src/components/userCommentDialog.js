import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core'
import Rating from 'material-ui-rating'

const UserCommentDialog = ({
  userUpdate,
  showUpdateDialog,
  updating,
  visibility,
  rating,
  handleCloseUpdate,
  handleChangeVisibility,
  handleChangeText,
  handleChangeRating,
  postComment,
}) => {
  let postAction
  if (visibility === 'public') {
    postAction = 'Post Publicly'
  } else {
    postAction = 'Post Privately'
  }
  return (
    <Dialog
      open={showUpdateDialog}
      onClose={() => handleCloseUpdate()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Comments can be shown to either all users publicly or kept privately.
        </DialogContentText>

        <RadioGroup
          aria-label="Visibility"
          name="visibility"
          value={visibility}
          onChange={e => handleChangeVisibility(e)}
        >
          <FormControlLabel
            value="public"
            control={<Radio />}
            label="Visible for all"
          />

          <FormControlLabel
            value="private"
            control={<Radio />}
            label="Visible only for me"
          />
        </RadioGroup>
        <Rating onChange={value => handleChangeRating(value)} value={rating} />
        <TextField
          margin="normal"
          id="userUpdate"
          type="text"
          fullWidth
          multiline
          rows="3"
          helperText="What did you like or dislike?"
          variant="outlined"
          value={userUpdate}
          onChange={e => handleChangeText(e)}
        />
      </DialogContent>
      <DialogActions>
        {updating && <CircularProgress size={24} />}

        <Button onClick={() => handleCloseUpdate()} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => postComment()} color="primary">
          {postAction}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserCommentDialog
