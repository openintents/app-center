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
} from '@material-ui/core'

const OwnerCommentDialog = ({
  userUpdate,
  showUpdateDialog,
  updating,
  handleCloseUpdate,
  handleChangeText,
  saveDraftUpdate,
  postComment,
}) => {
  return (
    <Dialog
      open={showUpdateDialog}
      onClose={() => handleCloseUpdate()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Publish Update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Updates are shown to all users onced published
        </DialogContentText>        
        <TextField
          margin="normal"
          id="userUpdate"
          type="text"
          fullWidth
          multiline
          rows="3"
          helperText="What is new? (~200 characters)"
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
        <Button onClick={() => saveDraftUpdate()} color="secondary">
          Save Draft
        </Button>
        <Button onClick={() => postComment()} color="primary">
          Post
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OwnerCommentDialog
