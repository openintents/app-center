import React, { Component } from 'react'
import './css/appdfeditor.css'
import './css/bootstrap-panel.css'
import './css/bootstrap-responsive.css'
import './css/bootstrap-switch.css'
import './css/bootstrap.css'
import './css/bsdocs.css'
import './css/datepicker.css'
export default class Editor extends Component {
  render() {
    return (
      <div class="container-fluid">
        <div class="row-fluid">
          <div class="span3">
            <div class="bs-docs-sidebar">
              <ul class="nav nav-list bs-docs-sidenav">
                <li>
                  <a href="#section-domain-name">
                    <i class="icon-chevron-right" />
                    Domain name
                  </a>
                </li>
                <li>
                  <a href="#section-categorization">
                    <i class="icon-chevron-right" /> Category
                  </a>
                </li>
                <li>
                  <a href="#section-description">
                    <i class="icon-chevron-right" /> Description
                  </a>
                </li>
                <li>
                  <a href="#section-price">
                    <i class="icon-chevron-right" /> Price
                  </a>
                </li>
                <li>
                  <a href="#section-customer-support">
                    <i class="icon-chevron-right" /> Customer Support
                  </a>
                </li>
                <li>
                  <a href="#section-consent">
                    <i class="icon-chevron-right" /> Consent
                  </a>
                </li>
                <li>
                  <a href="#section-content-description">
                    <i class="icon-chevron-right" /> Content Rating and
                    Descriptors
                  </a>
                </li>
                <li>
                  <a href="#section-availability">
                    <i class="icon-chevron-right" /> Availability
                  </a>
                </li>
                <li>
                  <a href="#section-requirements">
                    <i class="icon-chevron-right" /> Requirements
                  </a>
                </li>
                <li>
                  <a href="#section-testing-instructions">
                    <i class="icon-chevron-right" /> Testing Instructions
                  </a>
                </li>
                <li>
                  <a href="#section-store-specific">
                    <i class="icon-chevron-right" /> Store Specific
                  </a>
                </li>
                <li>
                  <a href="#section-inapp-products">
                    <i class="icon-chevron-right" /> In-app Products
                  </a>
                </li>
                <li>
                  <a href="#section-verify">
                    <i class="icon-chevron-right" /> Verify
                  </a>
                </li>
                <li>
                  <a href="#section-submit-appdf">
                    <i class="icon-chevron-right" /> Submit Meta Data
                  </a>
                </li>
              </ul>
            </div>
            {/*/.well */}
          </div>
          {/*/span*/}
          <div class="span9">
            <div class="hero-unit">
              <h1>App Details</h1>
              <p>
                Submitting an application to several app stores can be
                time-consuming. Futhermore, you do not own your app meta data.
                Store your meta data in one file that includes a description,
                screenshots, app icon, promo images, etc., This file will be
                stored on your own storage. Then simply upload this data to all
                the stores.
              </p>
              <p>
                OI App Center builds on top of work by the{' '}
                <a href="https://github.com/onepf">One Platform Foundation</a>.
              </p>
            </div>

            {/*MODALS START*/}
            <div
              id="requirements-store-add-modal"
              class="modal hide fade"
              tabindex="-1"
              role="dialog"
              aria-labelledby="requirements-store-add-modal-label"
              aria-hidden="true"
            >
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h3 id="requirements-store-add-modal-label">Add store</h3>
              </div>
              <div class="modal-body">
                <div class="control-group">
                  <label class="control-label" for="storespecific-input-modal">
                    Application store name
                  </label>
                  <div class="controls">
                    <div class="">
                      <input
                        type="text"
                        id="storespecific-input-modal"
                        data-validation-callback-callback="appdfEditor.validationCallbackStoreSpecify"
                        autocomplete="off"
                        data-provide="typeahead"
                        data-items="20"
                      />
                    </div>
                    <p class="help-block">
                      You can add custom fields for a particular application
                      store or rewrite any of the application description
                      fields. XML format is described in the{' '}
                      <a
                        href="https://github.com/onepf/AppDF/blob/master/specification/appds_spec_1_0.md"
                        target="_blank"
                      >
                        AppDF specification
                      </a>
                      .
                    </p>
                  </div>
                </div>
                {/*control-group*/}
                <div class="control-group">
                  <label
                    class="control-label"
                    for="storespecific-name-default-modal"
                  >
                    Store data
                  </label>
                  <div class="controls">
                    <textarea
                      class="input-x-xlarge"
                      rows="8"
                      id="storespecific-xml-default-modal"
                    />
                    <p class="help-block">
                      Store specific data in XML format. You can also rewrite
                      any of the application description fields in this XML.
                    </p>
                  </div>
                </div>
                {/*./control-group */}
              </div>
              <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                  Cancel
                </button>
                <button class="btn btn-primary">Add store</button>
              </div>
            </div>
            {/*Modal*/}

            <div
              id="import-descriptionxml-modal"
              class="modal hide fade"
              tabindex="-1"
              role="dialog"
              aria-labelledby="import-descriptionxml-modal-label"
              aria-hidden="true"
            >
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h3 id="import-descriptionxml-modal-label">
                  Import Description.XML
                </h3>
              </div>
              <div class="modal-body">
                <textarea
                  id="import-descriptionxml-modal-text"
                  class="input-x-xlarge"
                  rows="5"
                />
                <br />
                <div
                  class="alert alert-success hide"
                  id="import-descriptionxml-modal-status"
                >
                  <b>Importing Description.XML. Please wait...</b>
                  <div class="progress">
                    <div
                      id="load-descriptionxml-modal-progressbar"
                      class="bar"
                      style={{ width: 0 }}
                    />
                  </div>
                </div>
                <div
                  class="alert alert-error hide"
                  id="import-descriptionxml-modal-errors"
                >
                  <b>Import errors:</b>
                  <ul />
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                  Cancel
                </button>
                <button class="btn btn-primary">Import</button>
              </div>
            </div>
            {/*Modal*/}

            <div
              id="load-appdf-modal"
              class="modal hide fade"
              tabindex="-1"
              role="dialog"
              aria-labelledby="load-appdf-modal-label"
              aria-hidden="true"
            >
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h3 id="load-appdf-modal-label">Open AppDF File</h3>
              </div>
              <div class="modal-body">
                <div>
                  <input
                    type="file"
                    id="load-appdf-modal-file"
                    class="hide ie_show"
                    name="appdf-file"
                  />
                  <div class="input-append ie_hide">
                    <input
                      id="load-appdf-modal-prettyfile"
                      class="input-xlarge"
                      type="text"
                      readonly="readonly"
                    />
                    <button class="btn load-appdf-modal-browse">Browse</button>
                  </div>
                </div>
                <div
                  class="alert alert-success hide"
                  id="load-appdf-modal-status"
                >
                  <b>Loading application file. Please wait...</b>
                  <div class="progress">
                    <div
                      id="load-appdf-modal-progressbar"
                      class="bar"
                      style={{ width: 0 }}
                    />
                  </div>
                </div>
                <div
                  class="alert alert-error hide"
                  id="load-appdf-modal-errors"
                >
                  <b>Import errors:</b>
                  <ul />
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                  Cancel
                </button>
                <button
                  class="btn btn-primary"
                  id="load-appdf-modal-open-button"
                >
                  Open
                </button>
                <button
                  class="btn btn-primary hide"
                  id="load-appdf-modal-open-unfinished-button"
                >
                  Open unfinished
                </button>
              </div>
            </div>
            {/*Modal*/}

            <div
              id="description-videos-youtubevideo-dialog"
              class="modal hide fade"
              tabindex="-1"
              role="dialog"
              aria-labelledby="description-videos-youtubevideo-dialog-label"
              aria-hidden="true"
            >
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h3 id="description-videos-youtubevideo-dialog-label">
                  YouTube Video
                </h3>
              </div>
              <div class="modal-body">
                URL:
                <div class="input-append ie_hide">
                  <input
                    id="description-videos-youtubevideo-dialog-url"
                    class="input-xlarge"
                    type="text"
                  />
                  <button class="btn description-videos-youtubevideo-dialog-check">
                    Check
                  </button>
                </div>
                <p id="description-videos-youtubevideo-dialog-info">
                  Copy/pase YouTube video URL into the edit field and press the
                  "Check" button to make sure that URL is correct.
                </p>
                <iframe
                  width="420"
                  height="315"
                  id="description-videos-youtubevideo-dialog-video"
                  src=""
                  frameborder="0"
                  allowfullscreen
                  class="hide"
                />
              </div>
              <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                  Cancel
                </button>
                <button class="btn btn-primary">OK</button>
              </div>
            </div>
            {/*Modal*/}

            <div
              id="add-localization-modal"
              class="modal hide fade"
              tabindex="-1"
              role="dialog"
              aria-labelledby="add-localization-modal-label"
              aria-hidden="true"
            >
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h3 id="add-localization-modal-label">Add Localization</h3>
              </div>
              <div class="modal-body">
                <p>
                  Language:
                  <select id="add-localization-modal-language" />
                </p>
              </div>
              <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                  Cancel
                </button>
                <button class="btn btn-primary">Add Localization</button>
              </div>
            </div>
            {/*Model*/}
            {/*MODALS END*/}

            <form class="form-horizontal" action="" method="POST" novalidate>
              <section id="section-domain-name">
                <fieldset>
                  <div id="legend">
                    <legend class="">App domain name</legend>
                  </div>
                  <div class="control-group">
                    {/* apk-files/apk-file */}
                    <label class="control-label" for="pretty-apk-file">
                      App domain name <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <input
                        type="text"
                        id="domain-name"
                        name="domain-name"
                        data-validation-callback-callback="appdfEditor.validationCallbackDomainName"
                      />
                    </div>
                    <div class="controls">
                      <div class="apk-file-info" />
                    </div>
                  </div>
                </fieldset>
              </section>
              {/*section-apk-files*/}

              <section id="section-categorization">
                <fieldset>
                  <div id="legend">
                    <legend class="">Category</legend>
                  </div>
                  <div class="control-group">
                    {/* categorization/type */}
                    <label class="control-label" for="categorization-type">
                      Application type <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <select
                        id="categorization-type"
                        name="categorization-type"
                      >
                        <option value="application">Application</option>
                        <option value="game">Game</option>
                      </select>
                      <p class="help-block">Select if your program is a game</p>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* categorization/category */}
                    <label class="control-label" for="categorization-category">
                      Category <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <select
                        id="categorization-category"
                        name="categorization-category"
                      />
                      <p class="help-block">
                        Select the primary category. If you`re not sure, check
                        how this category will be mapped to application stores
                        categories.
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* categorization/subcategory */}
                    <label
                      class="control-label"
                      for="categorization-subcategory"
                    >
                      Subcategory
                    </label>
                    <div class="controls">
                      <select id="categorization-subcategory" />
                      <p class="help-block">
                        For this category you can also select a subcategory (can
                        be empty).If not sure, check how this subcategory will
                        be mapped to application stores categories
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="controls" id="store-categories-info" />
                  {/*div#store-categories-info*/}
                </fieldset>
              </section>
              {/*section-categorizatio*/}

              <section id="section-description">
                <fieldset>
                  <div id="legend">
                    <legend class="">Description</legend>
                  </div>
                  <div class="tabbable" id="description-locales">
                    {' '}
                    {/* Only required for left/right tabs */}
                    <ul class="nav nav-tabs" id="description-locales-header">
                      <li class="active">
                        <a
                          href="#description-locales-tab-default"
                          data-toggle="tab"
                        >
                          English US (Default)
                        </a>
                      </li>
                      <li class="dropdown">
                        <a
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                        >
                          More <b class="caret" />
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <a class="tab-addlocalization" href="#">
                              Add Localization
                            </a>
                          </li>
                          <li>
                            <a class="tab-removeselectedlocalization" href="#">
                              Remove Selected Localization
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <div class="tab-content" id="description-locales-content">
                      <div
                        class="tab-pane active"
                        id="description-locales-tab-default"
                      >
                        <div class="control-group-container">
                          <div class="control-group">
                            {/* description/texts/title */}
                            <label
                              class="control-label"
                              for="description-texts-title"
                            >
                              Title <span class="required-mark">*</span>
                            </label>
                            <div class="controls">
                              <input
                                type="text"
                                id="description-texts-title"
                                name="description-texts-title"
                                required
                                data-validation-required-message="Title is required"
                                maxlength="30"
                              />
                              <p class="help-block">
                                Different stores have different maximum title
                                length requirements. The first title should be
                                less than 30 symbols. You can{' '}
                                <a
                                  href="#"
                                  class="description-texts-title-addmore"
                                >
                                  add a longer title
                                </a>{' '}
                                for stores that support long titles.
                              </p>
                            </div>
                          </div>
                          {/*./control-group */}
                        </div>
                        {/*./control-group-container */}

                        <div class="control-group-container">
                          <div class="control-group">
                            {/* description/texts/short-description */}
                            <label
                              class="control-label"
                              for="description-texts-shortdescription"
                            >
                              Short description{' '}
                              <span class="required-mark">*</span>
                            </label>
                            <div class="controls">
                              <input
                                type="text"
                                id="description-texts-shortdescription"
                                name="description-texts-shortdescription"
                                required
                                data-validation-required-message="Short description is required"
                                maxlength="80"
                              />
                              <p class="help-block">
                                Different stores have different maximum short
                                description length requirements. The first short
                                - description should be less than 80 symbols.
                                You can{' '}
                                <a
                                  href="#"
                                  class="description-texts-shortdescription-addmore"
                                >
                                  add a longer short description
                                </a>{' '}
                                for stores that support longer ones.
                              </p>
                            </div>
                          </div>
                          {/*./control-group */}
                        </div>
                        {/*./control-group-container */}

                        <div class="control-group">
                          {/* description/texts/full-description */}
                          <label
                            class="control-label"
                            for="description-texts-fulldescription"
                          >
                            Full description{' '}
                            <span class="required-mark">*</span>
                          </label>
                          <div class="controls">
                            <textarea
                              class="input-xxlarge"
                              rows="5"
                              id="description-texts-fulldescription"
                              name="description-texts-fulldescription"
                              required
                              data-validation-required-message="Full description is required"
                              maxlength="4000"
                              data-validation-maxlength-message="Full description must be less than 4000 symbols"
                            />
                            <p class="help-block">
                              Please provide a full application description, to
                              be shown on the product page. You can include a
                              special subtag &lt;features&gt;. Everything inside
                              the &lt;features&gt; subtag will be shown only by
                              stores that do not support a separate features
                              list. This can be useful to avoid feature list
                              duplication. You can also include the following
                              HTML tags: &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;,
                              &lt;b&gt;, &lt;i&gt;. The app stores that do not
                              support those HTML tags will automatically convert
                              them to plain text. Maximum length: 4,000 symbols.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group">
                          {/* description/texts/features */}
                          <label
                            class="control-label"
                            for="description-texts-features"
                          >
                            Features <span class="required-mark">*</span>
                          </label>
                          <div class="controls">
                            <div class="feature-countainer">
                              <div class="input-prepend">
                                <span class="add-on">1.</span>
                                <input
                                  type="text"
                                  id="description-texts-features-1"
                                  name="description-texts-features-1"
                                  required
                                  data-validation-required-message="Minimum three features are required"
                                />
                              </div>
                            </div>
                            <div class="feature-countainer">
                              <div
                                class="input-prepend marginedinput"
                                style={{ display: 'block' }}
                              >
                                <span class="add-on">2.</span>
                                <input
                                  type="text"
                                  id="description-texts-features-2"
                                  name="description-texts-features-2"
                                  required
                                  data-validation-required-message="Minimum three features are required"
                                />
                              </div>
                            </div>
                            <div class="feature-countainer">
                              <div
                                class="input-prepend marginedinput"
                                style={{ display: 'block' }}
                              >
                                <span class="add-on">3.</span>
                                <input
                                  type="text"
                                  id="description-texts-features-3"
                                  name="description-texts-features-3"
                                  required
                                  data-validation-required-message="Minimum three features are required"
                                />
                              </div>
                            </div>
                            <div class="feature-countainer">
                              <div
                                class="input-prepend marginedinput"
                                style={{ display: 'block' }}
                              >
                                <span class="add-on">4.</span>
                                <input
                                  type="text"
                                  id="description-texts-features-4"
                                />
                              </div>
                            </div>
                            <div class="feature-countainer">
                              <div
                                class="input-prepend marginedinput"
                                style={{ display: 'block' }}
                              >
                                <span class="add-on">5.</span>
                                <input
                                  type="text"
                                  id="description-texts-features-5"
                                />
                              </div>
                            </div>
                            <p class="help-block">
                              Add three to five features of your application
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group">
                          {/* description/texts/keywords */}
                          <label
                            class="control-label"
                            for="description-texts-keywords"
                          >
                            Keywords <span class="required-mark">*</span>
                          </label>
                          <div class="controls">
                            <div class="input-append">
                              <input
                                type="text"
                                id="description-texts-keywords"
                                required
                                data-validation-required-message="At least one keyword is required"
                              />
                              <button
                                class="btn description-texts-keywords-addmore"
                                type="button"
                              >
                                <i class=" icon-plus-sign" />
                              </button>
                            </div>
                            <p class="help-block">
                              Please provide keywords that describe your
                              application.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group">
                          {/* description/texts/recent-changes */}
                          <label
                            class="control-label"
                            for="description-texts-recentchanges"
                          >
                            Recent changes
                          </label>
                          <div class="controls">
                            <textarea
                              class="input-xxlarge"
                              rows="5"
                              id="description-texts-recentchanges"
                              maxlength="500"
                              data-validation-maxlength-message="Recent changes must be less than 500 symbols"
                            />
                            <p class="help-block">
                              What is different about the latest version,
                              compared to the previous one. Maximum length: 500
                              symbols.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group">
                          {/* description/texts/privacy-policy */}
                          <label
                            class="control-label"
                            for="description-texts-privacypolicy"
                          >
                            Privacy policy
                          </label>
                          <div class="controls">
                            <input
                              type="text"
                              id="description-texts-privacypolicy-link"
                              name="description-texts-privacypolicy"
                            />
                            <p class="help-block">
                              Link to the privacy policy document for this
                              application. This is required if your application
                              collects personal data
                            </p>
                            <textarea
                              id="description-texts-privacypolicy-data"
                              class="input-xxlarge after-input"
                              rows="5"
                            />
                            <p class="help-block">
                              A full privacy police text for this application.
                              This is required if your application collects
                              personal data.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group">
                          {/* description/texts/eula */}
                          <label
                            class="control-label"
                            for="description-texts-eula"
                          >
                            End user license agreement
                          </label>
                          <div class="controls">
                            <input
                              type="text"
                              id="description-texts-eula-link"
                              name="description-texts-eula"
                            />
                            <p class="help-block">
                              If you like, you can provide a link to your End
                              User License Agreement (EULA).
                            </p>
                            <textarea
                              id="description-texts-eula-data"
                              class="input-xxlarge after-input"
                              rows="5"
                            />
                            <p class="help-block">
                              If you like, you can provide a link to the full
                              text of your End User License Agreement (EULA).
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group">
                          {/* description/images/app-icon */}
                          <label
                            class="control-label"
                            for="description-images-appicon"
                          >
                            Application icon{' '}
                            <span class="required-mark">*</span>
                          </label>
                          <div class="controls">
                            <div class="image-group app-icon-first">
                              <div class="image-input-group">
                                <input
                                  type="file"
                                  id="description-images-appicon"
                                  class="hide ie_show appicon-input empty-image"
                                  name="description-images-appicon"
                                  accept="image/png"
                                  data-validation-callback-callback="appdfEditor.validationCallbackAppIconFirst"
                                />
                                <img
                                  src="/img/appicon_placeholder.png"
                                  id="description-images-appicon-img"
                                  width="128"
                                  height="128"
                                />
                                <p class="image-input-label">&nbsp;</p>
                              </div>
                            </div>
                            <p class="help-block">
                              A 512x512 PNG file with the application icon to be
                              shown in the application list.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group screenshots-group">
                          {/* description/images/screenshots */}
                          <label
                            class="control-label"
                            for="description-images-screenshots"
                          >
                            Screenshots <span class="required-mark">*</span>
                          </label>
                          <div class="controls">
                            <div class="image-group">
                              <div class="image-input-group">
                                <input
                                  type="file"
                                  id="description-images-screenshot-1"
                                  class="hide ie_show screenshot-input empty-image"
                                  name="description-images-screenshot-1"
                                  accept="image/png"
                                  data-validation-callback-callback="appdfEditor.validationCallbackScreenshotRequired"
                                />
                                <img
                                  src="/img/screenshot_placeholder.png"
                                  width="132"
                                  height="220"
                                />
                                <p class="image-input-label">&nbsp;</p>
                              </div>
                              <div class="image-input-group">
                                <input
                                  type="file"
                                  id="description-images-screenshot-2"
                                  class="hide ie_show screenshot-input empty-image"
                                  name="description-images-screenshot-2"
                                  accept="image/png"
                                  data-validation-callback-callback="appdfEditor.validationCallbackScreenshotRequired"
                                />
                                <img
                                  src="/img/screenshot_placeholder.png"
                                  width="132"
                                  height="220"
                                />
                                <p class="image-input-label">&nbsp;</p>
                              </div>
                              <div class="image-input-group">
                                <input
                                  type="file"
                                  id="description-images-screenshot-3"
                                  class="hide ie_show screenshot-input empty-image"
                                  name="description-images-screenshot-3"
                                  accept="image/png"
                                  data-validation-callback-callback="appdfEditor.validationCallbackScreenshotRequired"
                                />
                                <img
                                  src="/img/screenshot_placeholder.png"
                                  width="132"
                                  height="220"
                                />
                                <p class="image-input-label">&nbsp;</p>
                              </div>
                              <div class="image-input-group">
                                <input
                                  type="file"
                                  id="description-images-screenshot-4"
                                  class="hide ie_show screenshot-input empty-image"
                                  name="description-images-screenshot-4"
                                  accept="image/png"
                                  data-validation-callback-callback="appdfEditor.validationCallbackScreenshotRequired"
                                />
                                <img
                                  src="/img/screenshot_placeholder.png"
                                  width="132"
                                  height="220"
                                />
                                <p class="image-input-label">&nbsp;</p>
                              </div>
                            </div>
                            <p class="help-block">
                              At least four 480x800 PNG screenshots are
                              required.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group description-images-largepromo">
                          {/* description/images/large-promo */}
                          <label
                            class="control-label"
                            for="description-images-largepromo"
                          >
                            Large promotion image
                          </label>
                          <div class="controls">
                            <div class="image-group">
                              <div class="image-input-group">
                                <input
                                  type="file"
                                  id="description-images-largepromo"
                                  class="hide ie_show image-input empty-image"
                                  name="description-images-largepromo"
                                  accept="image/png"
                                  data-validation-callback-callback="appdfEditor.validationCallbackPromo"
                                />
                                <img
                                  src="/img/largepromo_placeholder.png"
                                  id="description-images-largepromo-img"
                                  width="256"
                                  height="125"
                                />
                                <p class="image-input-label" />
                                <div class="btn large-promo-image-reset">
                                  Reset large promo image
                                </div>
                              </div>
                            </div>
                            <p class="help-block">
                              A 1024x500 PNG file, usually used by stores on PC
                              websites.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group description-images-smallpromo">
                          {/* description/images/small-promo */}
                          <label
                            class="control-label"
                            for="description-images-smallpromo"
                          >
                            Small promotion image
                          </label>
                          <div class="controls">
                            <div class="image-group">
                              <div class="image-input-group">
                                <input
                                  type="file"
                                  id="description-images-smallpromo"
                                  class="hide ie_show image-input empty-image"
                                  name="description-images-smallpromo"
                                  accept="image/png"
                                  data-validation-callback-callback="appdfEditor.validationCallbackPromo"
                                />
                                <img
                                  src="/img/smallpromo_placeholder.png"
                                  id="description-images-largepromo-img"
                                  width="180"
                                  height="120"
                                />
                                <p class="image-input-label" />
                                <div class="btn small-promo-image-reset">
                                  Reset small promo image
                                </div>
                              </div>
                            </div>
                            <p class="help-block">
                              A 180x120 PNG file which is usually used in mobile
                              app stores for app features.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group video-files-group">
                          {/* description/videos/video */}
                          <label class="control-label" for="pretty-video-file">
                            Video files
                          </label>
                          <div class="controls">
                            <p class="help-block">
                              You can{' '}
                              <a href="#" class="video-file-addmore">
                                add video files
                              </a>{' '}
                              for your application
                            </p>
                            <br />
                          </div>
                        </div>
                        {/*./control-group */}

                        <div class="control-group">
                          {/* description/videos/youtube-video */}
                          <label
                            class="control-label"
                            for="description-videos-youtubevideo"
                          >
                            YouTube video
                          </label>
                          <div class="controls">
                            <div class="input-append">
                              <input
                                type="text"
                                id="description-videos-youtubevideo"
                                name="description-videos-youtubevideo"
                                data-validation-callback-callback="appdfEditor.validationCallbackYoutube"
                              />
                              <button
                                class="btn description-videos-youtubevideo-browse"
                                type="button"
                              >
                                Browse
                              </button>
                            </div>

                            <p class="help-block">
                              Please include only the ID (and not the entire
                              URL). For example, if your YouTube video URL is
                              www.youtube.com/watch?v=4YcBHQ2fCDE please enter
                              4YcBHQ2fCDE
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}
                      </div>
                      {/*./tab-pane */}
                    </div>
                    {/*./tab-content */}
                  </div>
                  {/*./tabbable */}
                </fieldset>
              </section>
              {/*section-description*/}

              <section id="section-price">
                <fieldset>
                  <div id="legend">
                    <legend class="">Price</legend>
                  </div>
                  <div class="tabbable">
                    {' '}
                    {/* Only required for left/right tabs */}
                    <ul class="nav nav-pills">
                      <li class="active">
                        <a href="#tab-price-free" data-toggle="tab">
                          Free
                        </a>
                      </li>
                      <li>
                        <a href="#tab-price-paid" data-toggle="tab">
                          Paid
                        </a>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <div class="tab-pane active" id="tab-price-free">
                        <div class="control-group">
                          <div class="controls">
                            <label class="checkbox">
                              <input
                                type="checkbox"
                                value=""
                                id="price-free-trialversion"
                              />
                              This free application is a trial version.
                            </label>
                          </div>
                        </div>
                        {/*control-group*/}
                        <div class="control-group">
                          {/* price/free/full-version */}
                          <label
                            class="control-label"
                            for="price-free-full-version"
                          >
                            Full version
                          </label>
                          <div class="controls">
                            <input
                              type="text"
                              class="input-large"
                              id="price-free-fullversion"
                              name="price-free-fullversion"
                              disabled
                              pattern="^$|^([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9\-]+$"
                              data-validation-pattern-message="Wrong package name format. Must be a valid Android package name like 'org.wikimedia.wikipedia'"
                            />
                            <p class="help-block">
                              If there is another app which is the full version
                              of your app you can enter its package name here.
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}
                      </div>
                      {/*./tab-pane */}
                      <div class="tab-pane" id="tab-price-paid">
                        <div class="control-group">
                          {/* price/base-price */}
                          <label class="control-label" for="price-baseprice">
                            Price <span class="required-mark">*</span>
                          </label>
                          <div class="controls">
                            <div class="input-prepend">
                              <span class="add-on">USD</span>
                              <input
                                type="text"
                                id="price-baseprice"
                                class="input-small"
                                value="0"
                                pattern="^\d+\.\d+$|^\d+$"
                                data-validation-pattern-message="Wrong price value. Must be a valid number like '15.95'."
                              />
                            </div>
                            <p class="help-block">
                              Default product price in USD. Price for other
                              currencies will be automatically converted by the
                              stores from USD. If you want manual control you
                              can{' '}
                              <a href="#" class="price-localprice-add">
                                add local prices
                              </a>
                              .
                            </p>
                          </div>
                        </div>
                        {/*./control-group */}
                      </div>
                      {/*./tab-pane */}
                    </div>
                    {/*./tab-content */}
                  </div>
                  {/*./tabbable */}
                </fieldset>
              </section>
              {/*section-price*/}

              <section id="section-customer-support">
                <fieldset>
                  <div id="legend">
                    <legend class="">Customer Support</legend>
                  </div>
                  <div class="control-group">
                    {/* customer-support/phone */}
                    <label class="control-label" for="customersupport-phone">
                      Phone <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <input
                        id="customersupport-phone"
                        type="text"
                        name="customersupport-phone"
                        required
                        data-validation-required-message="Customer support phone is required"
                        data-validation-regex-regex="^\+(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$"
                        data-validation-regex-message="Wrong phone format, only digits, brackets, spaces and dashes are allowed. Must be in international format like +1 (555) 123-45-67."
                      />
                      <p class="help-block">
                        Customer support phone number. This must be in
                        international format (e.g., +1 (555) 123-45-67).
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* customer-support/email */}
                    <label class="control-label" for="customersupport-email">
                      Email <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <input
                        id="customersupport-email"
                        type="email"
                        name="customersupport-email"
                        required
                        data-validation-required-message="Customer support email is required"
                        data-validation-email-message="Customer support email must be a valid email address"
                      />
                      <p class="help-block">
                        Customer support email for this application. This must
                        be a valid email address.
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* customer-support/website */}
                    <label class="control-label" for="customersupport-website">
                      Website <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <input
                        id="customersupport-website"
                        type="text"
                        name="customersupport-website"
                        required
                        data-validation-regex-regex="^((http|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$"
                        data-validation-required-message="Customer support website is required"
                        data-validation-regex-message="Wrong customer support webpage format. Must be a valid URL."
                      />
                      <p class="help-block">
                        Webpage with customer support information. This must be
                        a valid URL.
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}
                </fieldset>
              </section>
              {/*section-customer-support*/}

              <section id="section-consent">
                <fieldset>
                  <div id="legend">
                    <legend class="">Consent</legend>
                  </div>

                  <div class="control-group">
                    <div class="controls">
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="consent-googleandroidcontentguidelines"
                        />
                        I agree to the {' '}
                        <a href="https://app.co/terms" target="_blank">
                          App.co Terms
                        </a>
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="consent-appcomining"
                        />
                        This application meets the{' '}
                        <a
                          href="https://app.co/mining/terms"
                          target="_blank"
                        >
                          App Mining Terms
                        </a>
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="consent-usexportlaws"
                        />
                        I acknowledge that this application may be subject to
                        United States export laws, regardless of my location or
                        nationality. I agree that I have complied with all such
                        laws, including any requirements for software with
                        encryption functions. I hereby certify that my
                        application is authorized for export from the United
                        States under these laws.{' '}
                        <a
                          href="https://support.google.com/googleplay/android-developer/support/bin/answer.py?answer=113770"
                          target="_blank"
                        >
                          More...
                        </a>
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="consent-importexportlaws"
                        />
                        I certify that this application may be imported to and
                        exported from any country in which you have authorized
                        sales to end users (without the need for the stores to
                        obtain any license or clearance or take any other
                        action) and is in full compliance with all applicable
                        laws and regulations governing imports and exports,
                        including those applicable to software that makes use of
                        encryption technology.
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="consent-freefromthirdpartycopytightedcontent"
                        />
                        I confirm that my application is free from third-party
                        copyrighted pictures, sounds, databases or other types
                        of information that I don't have a license for.
                      </label>
                    </div>
                  </div>
                  {/*control-group*/}
                </fieldset>
              </section>
              {/*section-consent*/}

              <section id="section-content-description">
                <fieldset>
                  <div id="legend">
                    <legend class="">Content Rating and Descriptors</legend>
                  </div>
                  <div class="control-group">
                    {/* content-description/content-rating */}
                    <label
                      class="control-label"
                      for="contentdescription-contentrating"
                    >
                      Content rating <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <select
                        id="contentdescription-contentrating"
                        name="contentdescription-contentrating"
                      >
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="10">10</option>
                        <option value="13">13</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                      </select>
                      <p class="help-block">
                        Minimum age allowance according to the{' '}
                        <a
                          href="http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board"
                          target="_blank"
                        >
                          ESRB standard
                        </a>
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    <label class="control-label">
                      Content descriptors <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <table class="table span8">
                        <tr>
                          <td>
                            <abbr title="Violent actions involving cartoon-like situations and characters. May include violence where a character is unharmed after the action has been inflicted">
                              Cartoon violence
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-cartoonviolence"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="May contain scenes of people getting injured or dying, often by use of weapons. Also may contain gore and blood-letting.">
                              Realistic violence
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-realisticviolence"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="May contain profanity, sexual innuendo, threats, and all manner of slurs and epithets.">
                              Bad language
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-badlanguage"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="May contain scenes that are considered too disturbing or frightening to younger or more emotionally vulnerable players.">
                              Fear
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-fear"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="May contain references to sexual attraction or sexual intercourse. Also may contain nudity and characters dressed in suggestive clothing.">
                              Sexual content
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-sexualcontent"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="May contain references to illegal drugs or a fictional substance that has parallels to real-life illegal drugs (in use, possession, or sale).">
                              Drugs
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-drugs"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="May contain elements that encourage or teach gambling.">
                              Gambling reference
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-gamblingreference"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="The consumption of alcoholic beverages or references to and/or images or alcoholic beverages">
                              Alcohol
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-alcohol"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="References to and/or images of tobacco products">
                              Smoking
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-smoking"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <abbr title="May contain cruelty or harassment based on race, ethnicity, gender, or sexual preferences.">
                              Discrimination
                            </abbr>
                          </td>
                          <td>
                            <select
                              id="contentdescription-contentdescriptors-discrimination"
                              class="input-small"
                            >
                              <option value="no">No</option>
                              <option value="light">Light</option>
                              <option value="strong">Strong</option>
                            </select>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    <label class="control-label">
                      Included activities <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="contentdescription-includedactivities-inappbilling"
                        />
                        In-app billing: this app allows - either standard or
                        custom in-app billing (also called "in-app purchases").
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="contentdescription-includedactivities-gambling"
                        />
                        Gambling: this appfeatures - a form of gambling.
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="contentdescription-includedactivities-advertising"
                        />
                        Advertising: this app features - a form of advertising
                        (this includs banner or AirPush-like advertising).
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="contentdescription-includedactivities-usergeneratedcontent"
                        />
                        This app features user-generated content.
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="contentdescription-includedactivities-usertousercommunications"
                        />
                        This app allows user-to-user communications.
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="contentdescription-includedactivities-accountcreation"
                        />
                        This app allows account creation.
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="contentdescription-includedactivities-personalinformationcollection"
                        />
                        Personal information collection: this application
                        transfers personal informations to the server, or
                        collects it locally on the device.
                      </label>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* content-description/rating-certificates */}
                    <label class="control-label">Rating certificates</label>
                    <div class="controls">
                      <table
                        class="table"
                        id="contentdescription-ratingcertificates"
                      >
                        <tr>
                          <th>Type</th>
                          <th>Rating</th>
                          <th>Certificate</th>
                          <th>Mark</th>
                        </tr>
                        <tr>
                          <td>
                            <a
                              class="contentdescription-ratingcertificates-type"
                              href="http://en.wikipedia.org/wiki/Pan_European_Game_Information"
                              target="_blank"
                            >
                              PEGI
                            </a>
                          </td>
                          <td>
                            <select
                              class="input-large"
                              id="contentdescription-ratingcertificates-rating-pegi"
                            >
                              <option value="">No certificate</option>
                              <option value="3">3</option>
                              <option value="7">7</option>
                              <option value="12">12</option>
                              <option value="16">16</option>
                              <option value="18">18</option>
                            </select>
                          </td>
                          <td>
                            <div class="file-input-group">
                              <input
                                type="file"
                                id="contentdescription-ratingcertificates-certificate-pegi"
                                class="hide ie_show pretty-file-file"
                                name="contentdescription-ratingcertificates-certificate"
                                accept="application/pdf"
                              />
                              <div class="input-append ie_hide">
                                <input
                                  class="input-small pretty-file-input"
                                  type="text"
                                  readonly="readonly"
                                />
                                <a class="btn pretty-file-button">Browse</a>
                              </div>
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr>
                          <td>
                            <a
                              class="contentdescription-ratingcertificates-type"
                              href="http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board"
                              target="_blank"
                            >
                              ESRB
                            </a>
                          </td>
                          <td>
                            <select
                              class="input-large"
                              id="contentdescription-ratingcertificates-rating-esrb"
                            >
                              <option value="">No certificate</option>
                              <option value="3">Early Childhood (eC)</option>
                              <option value="6">Everyone (E)</option>
                              <option value="10">Everyone 10+ (E10+)</option>
                              <option value="13">Teen (T)</option>
                              <option value="17">Mature 17+ (M)</option>
                              <option value="18">Adults Only 18+ (Ao)</option>
                            </select>
                          </td>
                          <td>
                            <div class="file-input-group">
                              <input
                                type="file"
                                id="contentdescription-ratingcertificates-certificate-esrb"
                                class="hide ie_show pretty-file-file"
                                name="contentdescription-ratingcertificates-certificate"
                                accept="application/pdf"
                              />
                              <div class="input-append ie_hide">
                                <input
                                  class="input-small pretty-file-input"
                                  type="text"
                                  readonly="readonly"
                                />
                                <a class="btn pretty-file-button">Browse</a>
                              </div>
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr>
                          <td>
                            <a
                              class="contentdescription-ratingcertificates-type"
                              href="http://en.wikipedia.org/wiki/Game_Rating_Board"
                              target="_blank"
                            >
                              GRB
                            </a>
                          </td>
                          <td>
                            <select
                              class="input-large"
                              id="contentdescription-ratingcertificates-rating-gbr"
                            >
                              <option value="">No certificate</option>
                              <option value="0">All</option>
                              <option value="12">12</option>
                              <option value="15">15</option>
                              <option value="18">18</option>
                            </select>
                          </td>
                          <td>
                            <div class="file-input-group">
                              <input
                                type="file"
                                id="contentdescription-ratingcertificates-certificate-gbr"
                                class="hide ie_show pretty-file-file"
                                name="contentdescription-ratingcertificates-certificate"
                                accept="application/pdf"
                              />
                              <div class="input-append ie_hide">
                                <input
                                  class="input-small pretty-file-input"
                                  type="text"
                                  readonly="readonly"
                                />
                                <a class="btn pretty-file-button">Browse</a>
                              </div>
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr>
                          <td>
                            <a
                              class="contentdescription-ratingcertificates-type"
                              href="http://en.wikipedia.org/wiki/Computer_Entertainment_Rating_Organization"
                              target="_blank"
                            >
                              CERO
                            </a>
                          </td>
                          <td>
                            <select
                              class="input-large"
                              id="contentdescription-ratingcertificates-rating-cero"
                            >
                              <option value="">No certificate</option>
                              <option value="0">All ages (A)</option>
                              <option value="12">Ages 12 and up (B)</option>
                              <option value="15">Ages 15 and up (C)</option>
                              <option value="17">Ages 17 and up (D)</option>
                              <option value="18">
                                Ages 18 and up only (Z)
                              </option>
                            </select>
                          </td>
                          <td>
                            <div class="file-input-group">
                              <input
                                type="file"
                                id="contentdescription-ratingcertificates-certificate-cero"
                                class="hide ie_show pretty-file-file"
                                name="contentdescription-ratingcertificates-certificate"
                                accept="application/pdf"
                              />
                              <div class="input-append ie_hide">
                                <input
                                  class="input-small pretty-file-input"
                                  type="text"
                                  readonly="readonly"
                                />
                                <a class="btn pretty-file-button">Browse</a>
                              </div>
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr>
                          <td>
                            <a
                              class="contentdescription-ratingcertificates-type"
                              href="http://en.wikipedia.org/wiki/Department_of_Justice,_Rating,_Titles_and_Qualification"
                              target="_blank"
                            >
                              DEJUS
                            </a>
                          </td>
                          <td>
                            <select
                              class="input-large"
                              id="contentdescription-ratingcertificates-rating-dejus"
                            >
                              <option value="">No certificate</option>
                              <option value="0">L</option>
                              <option value="10">10</option>
                              <option value="12">12</option>
                              <option value="14">14</option>
                              <option value="16">16</option>
                              <option value="18">18</option>
                            </select>
                          </td>
                          <td>
                            <div class="file-input-group">
                              <input
                                type="file"
                                id="contentdescription-ratingcertificates-certificate-dejus"
                                class="hide ie_show pretty-file-file"
                                name="contentdescription-ratingcertificates-certificate"
                                accept="application/pdf"
                              />
                              <div class="input-append ie_hide">
                                <input
                                  class="input-small pretty-file-input"
                                  type="text"
                                  readonly="readonly"
                                />
                                <a class="btn pretty-file-button">Browse</a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="file-input-group">
                              <input
                                type="file"
                                id="contentdescription-ratingcertificates-mark-dejus"
                                class="hide ie_show pretty-file-file"
                                name="contentdescription-ratingcertificates-mark"
                                accept="application/pdf"
                              />
                              <div class="input-append ie_hide">
                                <input
                                  class="input-small pretty-file-input"
                                  type="text"
                                  readonly="readonly"
                                />
                                <a class="btn pretty-file-button">Browse</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a
                              class="contentdescription-ratingcertificates-type"
                              href="http://en.wikipedia.org/wiki/Freiwillige_Selbstkontrolle_der_Filmwirtschaft"
                              target="_blank"
                            >
                              FSK
                            </a>
                          </td>
                          <td>
                            <select
                              class="input-large"
                              id="contentdescription-ratingcertificates-rating-fsk"
                            >
                              <option value="">No certificate</option>
                              <option value="0">0</option>
                              <option value="6">6</option>
                              <option value="12">12</option>
                              <option value="16">16</option>
                              <option value="18">18</option>
                            </select>
                          </td>
                          <td>
                            <div class="file-input-group">
                              <input
                                type="file"
                                id="contentdescription-ratingcertificates-certificate-fsk"
                                class="hide ie_show pretty-file-file"
                                name="contentdescription-ratingcertificates-certificate"
                                accept="application/pdf"
                              />
                              <div class="input-append ie_hide">
                                <input
                                  class="input-small pretty-file-input"
                                  type="text"
                                  readonly="readonly"
                                />
                                <a class="btn pretty-file-button">Browse</a>
                              </div>
                            </div>
                          </td>
                          <td />
                        </tr>
                      </table>
                      <p class="help-block">
                        If you have an industry-recognized rating certificates
                        for your game or application, please upload a scanned
                        image of your document in PDF format. For a DEJUS
                        certificate, you are also required to upload a
                        certification mark. Please see{' '}
                        <a
                          href="http://img.samsungapps.com/seller/en_US/images/common/bg/mark.jpg"
                          target="_blank"
                        >
                          this example
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}
                </fieldset>
              </section>
              {/*section-content-description*/}

              <section id="section-availability">
                <fieldset>
                  <div id="legend">
                    <legend class="">Availability</legend>
                  </div>

                  <div class="control-group">
                    {/* availability/countries */}
                    <label
                      class="control-label"
                      for="availability-supportedcountries"
                    >
                      Countries
                    </label>
                    <div class="controls">
                      <div>
                        <label class="radio">
                          <input
                            type="radio"
                            checked="checked"
                            name="availability-supportedcountries-type"
                            id="availability-supportedcountries-type-default"
                            value="include"
                          />
                          Disable countries list
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            name="availability-supportedcountries-type"
                            id="availability-supportedcountries-type-include"
                            value="include"
                          />
                          Enable supported countries list
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            name="availability-supportedcountries-type"
                            id="availability-supportedcountries-type-exclude"
                            value="exclude"
                          />
                          Enable unsupported countries list
                        </label>
                      </div>
                      <div
                        id="availability-supportedcountries-include"
                        class="hide"
                      />
                      <div
                        id="availability-supportedcountries-exclude"
                        class="hide"
                      />
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* availability/period */}
                    <label class="control-label" for="availability">
                      Period
                    </label>
                    <div class="controls">
                      <table class="table span8">
                        <tbody>
                          <tr>
                            <td>Since</td>
                            <td>
                              <input
                                class="availability-period-since"
                                type="text"
                                readonly="readonly"
                              />
                            </td>
                            <td>
                              <div class="btn clear-datepicker">Clear date</div>
                            </td>
                          </tr>
                          <tr>
                            <td>Until</td>
                            <td>
                              <input
                                class="availability-period-until"
                                type="text"
                                readonly="readonly"
                              />
                            </td>
                            <td>
                              <div class="btn clear-datepicker">Clear date</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="help-block hide" />
                    </div>
                  </div>
                  {/*control-group*/}
                </fieldset>
              </section>
              {/*section-availability*/}

              <section id="section-requirements">
                <fieldset>
                  <div id="legend">
                    <legend class="">Requirements</legend>
                  </div>
                  <div class="control-group">
                    {/* requirements/features */}
                    <label class="control-label" for="requirements-features">
                      Features
                    </label>
                    <div class="controls">
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="requirements-features-publish-data"
                        />
                        This application publishes data for the user.
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="requirements-features-email"
                        />
                        This application requires to read the user's email
                        address.
                      </label>

                      <label class="checkbox">
                        <input
                          type="checkbox"
                          value=""
                          id="requirements-features-online"
                        />
                        This application cannot work in offline mode and
                        requires an internet connection.
                      </label>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* requirements/supported-languages */}
                    <label
                      class="control-label"
                      for="requirements-supportedlanguages"
                    >
                      Supported Languages
                    </label>
                    <div class="controls">
                      <div>
                        <label class="radio">
                          <input
                            type="radio"
                            name="requirements-supportedlanguages-type"
                            id="requirements-supportedlanguages-type-default"
                            value="default"
                            checked
                          />
                          Take information about supported languages from the
                          application
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            name="requirements-supportedlanguages-type"
                            id="requirements-supportedlanguages-type-custom"
                            value="custom"
                          />
                          Enable custom supported language selection
                        </label>
                      </div>
                      <div id="requirements-supportedlanguages" class="hide" />
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* requirements/supported-devices */}
                    <label
                      class="control-label"
                      for="requirements-supporteddevices"
                    >
                      Unsupported Devices
                    </label>
                    <div class="controls">
                      <div class="input-append">
                        <input
                          type="text"
                          id="requirements-supporteddevices-input"
                          data-validation-callback-callback="appdfEditor.validationCallbackRequirementDevice"
                          autocomplete="off"
                        />
                        <button
                          class="btn requirements-supporteddevices-addmore"
                          type="button"
                        >
                          Add
                        </button>
                      </div>
                      <p class="help-block">
                        Add unsupported device model names (aka{' '}
                        <a
                          href="http://developer.android.com/reference/android/os/Build.html#DEVICE"
                          target="_blank"
                        >
                          name of the industrial design
                        </a>
                        ).
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}

                  <div class="control-group">
                    {/* requirements/supported-resolutions */}
                    <label
                      class="control-label"
                      for="requirements-supportedresolutions"
                    >
                      Supported Screen Resolutions
                    </label>
                    <div class="controls">
                      <div>
                        <label class="radio">
                          <input
                            type="radio"
                            name="requirements-supportedresolutions-type"
                            id="requirements-supportedresolutions-type-default"
                            value="default"
                            checked
                          />
                          Take information about supported screen resolutions
                          from the application.
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            name="requirements-supportedresolutions-type"
                            id="requirements-supportedresolutions-type-include"
                            value="include"
                          />
                          Enable custom supported screen resolution selection.
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            name="requirements-supportedresolutions-type"
                            id="requirements-supportedresolutions-type-exclude"
                            value="exclude"
                          />
                          Enable custom unsupported screen resolution selection
                        </label>
                      </div>
                      <div
                        id="requirements-supportedresolutions-include"
                        class="hide"
                      />
                      <div
                        id="requirements-supportedresolutions-exclude"
                        class="hide"
                      />
                    </div>
                  </div>
                  {/*control-group*/}
                </fieldset>
              </section>
              {/*section-requirements*/}

              <section id="section-testing-instructions">
                <fieldset>
                  <div id="legend">
                    <legend class="">Testing Instructions</legend>
                  </div>
                  <div class="control-group">
                    {/* content-description */}
                    <label class="control-label" for="testinginstructions">
                      Testing Instructions <span class="required-mark">*</span>
                    </label>
                    <div class="controls">
                      <textarea
                        class="input-xxlarge"
                        rows="5"
                        id="testinginstructions"
                        name="testinginstructions"
                        required
                        data-validation-required-message="Testing instructions are required"
                        maxlength="4000"
                        data-validation-maxlength-message="Testing instructions text must be less than 4000 symbols"
                      />
                      <p class="help-block">
                        Instructions for people in the app stores who will test
                        your application. If use of your application requires an
                        account, please provide testing account information.
                        Maximum length: 4,000 symbols.
                      </p>
                    </div>
                  </div>
                  {/*control-group*/}
                </fieldset>
              </section>
              {/*section-testing-instructions*/}

              <section id="section-store-specific">
                <fieldset>
                  <div id="legend">
                    <legend class="">Store Specific</legend>
                  </div>
                  <div class="control-group-container">
                    <div class="control-group">
                      <label class="control-label" for="storespecific-input">
                        Application store name
                      </label>
                      <div class="controls">
                        <div class="">
                          <button
                            class="btn storespecific-addmore"
                            type="button"
                          >
                            Add new store specific data
                          </button>
                        </div>
                        <p class="help-block">
                          You can add custom fields for a particular application
                          store or rewrite any of the application description
                          fields. XML format is described in the{' '}
                          <a
                            href="https://github.com/onepf/AppDF/blob/master/specification/appds_spec_1_0.md"
                            target="_blank"
                          >
                            AppDF specification
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                    {/*control-group*/}
                  </div>
                </fieldset>
              </section>
              {/*section-store-specific*/}

              <section id="section-inapp-products">
                <fieldset>
                  <div id="legend">
                    <legend class="">In-app Products</legend>
                  </div>
                  <div id="inapp-products">
                    <div class="control-group-container">
                      <div class="control-group">
                        <label class="checkbox">
                          <input
                            type="checkbox"
                            class="no-validation"
                            id="fortumo-support"
                          />
                          Fortumo Support
                        </label>
                      </div>
                    </div>
                    {/*abstract panel*/}
                    <div
                      class="panel"
                      id="inapp-product-abstract"
                      style={{ display: 'none' }}
                    >
                      <a class="close close-panel" style={{ marginTop: -6 }}>
                        ×
                      </a>
                      <div class="control-group-container">
                        <div class="control-group">
                          <label class="control-label" for="inapp-type">
                            Product type
                          </label>
                          <div class="controls">
                            <div class="btn-group" data-toggle="buttons-radio">
                              <button
                                class="btn active inapp-type inapp-type-item"
                                type="button"
                              >
                                Item
                              </button>
                              <button
                                class="btn inapp-type inapp-type-subs"
                                type="button"
                              >
                                Subscription
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*product type*/}

                      <div class="control-group-container">
                        <div class="control-group">
                          <label class="control-label" for="inapp-id-abstract">
                            ID <span class="required-mark">*</span>
                          </label>
                          <div class="controls">
                            <input
                              id="inapp-id-abstract"
                              type="text"
                              name="inapp-id-abstract"
                              required
                              data-validation-required-message="Product ID is required"
                              data-validation-regex-regex="^([a-z]|[0-9]){1}[a-z0-9._]*$"
                              data-validation-regex-message="Product ID must start with a small letter or digit and contain only small letters, digits, commas and underscores."
                              class="no-validation"
                            />
                          </div>
                        </div>
                      </div>
                      {/*id*/}

                      <div
                        class="control-group-container inapp-subscription-period"
                        style={{ display: 'none' }}
                      >
                        <div class="control-group">
                          <label
                            class="control-label"
                            for="inapp-subscription-period-abstract"
                          >
                            Subscription period
                          </label>
                          <div class="controls">
                            <select
                              id="inapp-subscription-period-abstract"
                              name="inapp-subscription-period-abstract"
                            >
                              <option value="oneMonth">One month</option>
                              <option value="oneYear">One year</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {/*subscription period*/}

                      <div class="control-group-container">
                        <div class="control-group">
                          <label
                            class="control-label"
                            for="inapp-published-abstract"
                          >
                            Published
                          </label>
                          <div class="controls">
                            <input
                              type="checkbox"
                              class="no-validation"
                              id="inapp-published-abstract"
                            />
                          </div>
                        </div>
                      </div>
                      {/*published*/}

                      <div
                        class="control-group-container fortumo"
                        style={{ display: 'none' }}
                      >
                        <div class="control-group">
                          <label
                            class="control-label"
                            for="fortumo-consumable-abstract"
                          >
                            Consumable
                          </label>
                          <div class="controls">
                            <input
                              type="checkbox"
                              class="no-validation"
                              id="fortumo-consumable-abstract"
                            />
                          </div>
                        </div>
                      </div>
                      {/*consumable*/}

                      <div
                        class="control-group-container fortumo"
                        style={{ display: 'none' }}
                      >
                        <div class="control-group">
                          <label
                            class="control-label"
                            for="fortumo-serviceid-abstract"
                          >
                            Fortumo Service ID
                          </label>
                          <div class="controls">
                            <input
                              id="fortumo-serviceid-abstract"
                              type="text"
                              name="fortumo-serviceid-abstract"
                              class="no-validation"
                            />
                          </div>
                        </div>
                      </div>
                      {/*fortumo service id*/}

                      <div
                        class="control-group-container fortumo"
                        style={{ display: 'none' }}
                      >
                        <div class="control-group">
                          <label
                            class="control-label"
                            for="fortumo-secret-abstract"
                          >
                            Fortumo In-app Secret
                          </label>
                          <div class="controls">
                            <input
                              id="fortumo-secret-abstract"
                              type="text"
                              name="fortumo-secret-abstract"
                              class="no-validation"
                            />
                          </div>
                        </div>
                      </div>
                      {/*fortumo secret*/}

                      <div
                        class="control-group-container fortumo"
                        style={{ display: 'none' }}
                      >
                        <div class="control-group">
                          <label
                            class="control-label"
                            for="nook-serviceid-abstract"
                          >
                            Nook Service ID
                          </label>
                          <div class="controls">
                            <input
                              id="nook-serviceid-abstract"
                              type="text"
                              name="nook-serviceid-abstract"
                              class="no-validation "
                            />
                          </div>
                        </div>
                      </div>
                      {/*fortumo service id*/}

                      <div
                        class="control-group-container fortumo"
                        style={{ display: 'none' }}
                      >
                        <div class="control-group">
                          <label
                            class="control-label"
                            for="nook-secret-abstract"
                          >
                            Nook In-app Secret
                          </label>
                          <div class="controls">
                            <input
                              id="nook-secret-abstract"
                              type="text"
                              name="nook-secret-abstract"
                              class="no-validation"
                            />
                          </div>
                        </div>
                      </div>
                      {/*fortumo secret*/}

                      <div class="tabbable" id="inapp-locales-abstract">
                        <ul
                          class="nav nav-tabs"
                          id="inapp-locales-abstract-header"
                        >
                          <li class="active">
                            <a
                              href="#inapp-locales-abstract-tab-default"
                              data-toggle="tab"
                            >
                              English US (Default)
                            </a>
                          </li>
                          <li class="dropdown">
                            <a
                              class="dropdown-toggle"
                              data-toggle="dropdown"
                              href="#"
                            >
                              More <b class="caret" />
                            </a>
                            <ul class="dropdown-menu">
                              <li>
                                <a class="tab-addlocalization" href="#">
                                  Add Localization
                                </a>
                              </li>
                              <li>
                                <a
                                  class="tab-removeselectedlocalization"
                                  href="#"
                                >
                                  Remove Selected Localization
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                        <div
                          class="tab-content"
                          id="inapp-locales-abstract-content"
                        >
                          <div
                            class="tab-pane active"
                            id="inapp-locales-abstract-tab-default"
                          >
                            <div class="control-group">
                              <label class="control-label" for="inapp-title">
                                Title <span class="required-mark">*</span>
                              </label>
                              <div class="controls">
                                <input
                                  type="text"
                                  name="inapp-title"
                                  required
                                  data-validation-required-message="Product title is required"
                                  data-validation-regex-regex="^.{1,55}$"
                                  data-validation-regex-message="Product title must be no longer than 55 symbols."
                                  class="inapp-title no-validation"
                                />
                              </div>
                            </div>
                            {/*title*/}

                            <div class="control-group">
                              <label
                                class="control-label"
                                for="inapp-description"
                              >
                                Description <span class="required-mark">*</span>
                              </label>
                              <div class="controls">
                                <input
                                  type="text"
                                  name="inapp-description"
                                  required
                                  data-validation-required-message="Product description is required"
                                  data-validation-regex-regex="^.{1,80}$"
                                  data-validation-regex-message="Product description must be no longer than 80 symbols."
                                  class="inapp-description input-xxlarge no-validation"
                                />
                              </div>
                            </div>
                            {/*description*/}
                          </div>
                        </div>
                      </div>
                      {/*tabable*/}
                      <hr />

                      <div class="control-group">
                        <label
                          class="control-label"
                          for="inapp-baseprice-abstract"
                        >
                          Price <span class="required-mark">*</span>
                        </label>
                        <div class="controls">
                          <div class="input-prepend">
                            <span class="add-on">USD</span>
                            <input
                              type="text"
                              id="inapp-baseprice-abstract"
                              required
                              data-validation-required-message="Product price is required"
                              pattern="^\d+\.\d+$|^\d+$"
                              data-validation-pattern-message="Wrong product price value. Must be a valid number like '15.95'."
                              class="input-small no-validation"
                            />
                          </div>
                        </div>
                      </div>
                      {/*price*/}

                      <div class="control-group-container">
                        <div class="control-group">
                          <label
                            class="control-label"
                            for="inapp-autofill-abstract"
                          >
                            Autofill prices
                          </label>
                          <div class="controls">
                            <input
                              type="checkbox"
                              class="no-validation"
                              id="inapp-autofill-abstract"
                            />
                          </div>
                        </div>
                      </div>
                      {/*autofill prices*/}
                    </div>
                    {/*panel*/}
                  </div>
                  <a href="#" class="btn" id="inapp-addmore">
                    Add new in-app product
                  </a>
                </fieldset>
              </section>
              {/*section-inapp-products*/}

              <section id="section-verify">
                <fieldset>
                  <div id="legend">
                    <legend class="">Verify</legend>
                  </div>
                  <div class="form-actions" style={{ padding: '20 80 20 100' }}>
                    <div class="alert alert-error hide" id="form-errors">
                      <b>Errors:</b>
                      <ul />
                    </div>
                    <div class="alert alert-success hide" id="build-status">
                      <b>Verification progress:</b>
                      <br />
                      <div class="progress">
                        <div
                          id="build-progressbar"
                          class="bar"
                          style={{ width: 0 }}
                        />
                      </div>
                    </div>
                    <a href="#" id="build-appdf-file" class="btn btn-primary">
                      Application Meta Data File
                    </a>
                    <a
                      href="#"
                      id="build-unfinished-appdf-file"
                      class="btn btn-primary hide"
                    >
                      Unfinished Application Meta Data File
                    </a>
                    <a
                      href="#"
                      id="build-inapp-products-xml"
                      class="btn btn-primary"
                    >
                      In-app Products XML
                    </a>
                  </div>
                </fieldset>
              </section>

              <section id="section-submit-appdf">
                <fieldset>
                  <div id="legend">
                    <legend class="">Submit File to App Stores</legend>
                  </div>
                  <div class="control-group">
                    <label class="control-label">
                      App Stores supporting Blockstack apps
                    </label>
                    <div class="controls">
                      <a href="http://app.co" target="_blank">
                        <img
                          class="img-rounded"
                          src="/img/appstores/appco.png"
                          width="250"
                          style={{ margin: '10px' }}
                        />
                      </a>
                      <a href="http://dapp.com" target="_blank">
                        <img
                          class="img-rounded"
                          src="/img/appstores/dapp.png"
                          width="250"
                          style={{ margin: '10px' }}
                        />
                      </a>
                    </div>
                  </div>
                </fieldset>
              </section>
              {/*section-store-specific*/}
            </form>
          </div>
          {/*/span*/}
        </div>
        {/*/row*/}
      </div>
    )
  }
}
