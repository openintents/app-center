import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const ClaimAppDialog = ({
  show,
  claimApp,
  handleCloseDialog,
  canClaim,
  appName,
}) => {
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
          {!canClaim && (
            <>
              Your Blockstack ID must match with one of the IDs published in the
              application manifest.{' '}
              <a
                href="https://forum.blockstack.org/t/app-ownership-on-oi-app-center-and-elsewhere/9049"
                color="error"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
              </a>
            </>
          )}
          {canClaim && (
            <>
              Your Blockstack ID matches with one of the IDs in the application
              manifest or was manually added as app publisher.
              <br />
              <br />
              Do you want to claim the app and post updates?
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDialog()} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            claimApp()
            handleCloseDialog()
          }}
          color="primary"
          disabled={!canClaim}
        >
          Claim
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClaimAppDialog
