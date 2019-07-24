import React from 'react'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from '@material-ui/core'
import Rating from 'material-ui-rating'

const UserCommentBox = ({
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
  return (
    <Paper
      open={showUpdateDialog}
      onClose={() => handleCloseUpdate()}
      aria-labelledby="form-dialog-title"
      style={{padding:8, marginTop:10}}
    >
      <div>
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
        <Rating
          onChange={(value) => handleChangeRating(value)}
          value={rating}
        />
        <TextField
          margin="normal"
          id="userUpdate"
          type="text"
          fullWidth
          multiline
          rows="3"
          placeholder="What did you like or dislike?"
          helperText="Comments can be shown to either all users publicly or kept privately."
          variant="outlined"
          value={userUpdate}
          onChange={e => handleChangeText(e)}
        />
      </div>
      <div>
        {updating && <CircularProgress size={24} />}
        <Button onClick={() => postComment()} color="primary">
          Comment
        </Button>
      </div>
    </Paper>
  )
}

export default UserCommentBox
