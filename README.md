## OI App Center

The place with all your data about Blockstack apps.

## Further Documentation in nested READMEs

- please see the [src README](/src/README.md) for explanation on the layout
- please see the [app README](/src/app/README.md) for explanation on the app

## Other Resources

Other useful resources/reference projects that may help you:

- https://docs.blockstack.org

## Local Development

### Curate App Meta Data

Following files can be edited manually:

- **unlisted-app.json**
  - data for apps not listed on app.co
- **src/app-meta.json**
  - mark apps unusable apps
  - specify manifest location
  - overwrite foss details

To generate all meta with the edited data run

```
yarn generate
```

### Posts

- **src/components/posts.js**
  contains the list of static posts that will be mixed with updates from verified authors. The date is not taken from the front matter.
- **content/blog/&lt;blog-folder&gt;**
  contains a blog, needs to be added to posts.js

### Run

1. Launch Radiks server
   1. In terminal start db server. Run: `mongod`
   1. In second terminal start radiks: Run: `yarn start`
1. Launch Gatsby server
