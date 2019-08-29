import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'

const ClaimAppDialog = ({ show, claimApp, handleCloseDialog, canClaim, appName}) => {
  return (
    <Dialog
      open={show}
      onClose={() => handleCloseDialog()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Claim App</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Apps can <b>only</b> be claimed by developers of {appName}.
          <br />
          Your Blockstack ID must match with one of the IDs published in the
          application manifest.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDialog()} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => claimApp()} color="primary" disabled={!canClaim}>
          Claim
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClaimAppDialog
