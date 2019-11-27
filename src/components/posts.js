export const allPost = data => [
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (November 2019)',
      path: '2019-11',
      date: new Date('2019-11-27'),
    },
  },{
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (October 2019)',
      path: '2019-10',
      date: new Date('2019-10-22'),
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (September 2019)',
      path: '2019-09',
      date: new Date('2019-09-29'),
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (August 2019)',
      path: '2019-08',
      date: new Date('2019-08-23'),
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (July 2019)',
      path: '2019-07',
      date: new Date('2019-08-12'),
    },
  },
  {
    type: 'appUpdate',
    post: {
      link: 'https://www.bloco.io/blog/2019/blockstack-android-tips',
      title: 'Blockstack Android Tips',
      date: new Date('2019-07-24'),
      description:
        'When developing the Envelop Android app using the Blockstack Android library, I ran into some important gotchas. I wanted to share them for whoever starts on the same path.',
      appcoId: '1453',
    },
  },
  {
    type: 'appUpdate',
    post: {
      link:
        'https://blog.graphitedocs.com/the-simple-way-to-remain-gdpr-compliant/',
      title: 'The Simple Way to Remain GDPR Compliant',
      date: new Date('2019-07-15'),
      description:
        'How Graphite can replace Microsoft office 365 in schools in Europe',
      appcoId: '216',
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (June 2019)',
      path: '2019-06',
      date: new Date('2019-07-06'),
    },
  },
  {
    type: 'post',
    post: {
      date: new Date('2019-05-09'),
      node: data.allMarkdownRemark.edges[0].node,
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (May 2019)',
      path: '2019-05',
      date: new Date('2019-05-05'),
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (April 2019)',
      path: '2019-04',
      date: new Date('2019-04-03'),
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (March 2019)',
      path: '2019-03',
      date: new Date('2019-04-03'),
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (February 2019)',
      path: '2019-02',
      date: new Date('2019-04-03'),
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (January 2019)',
      path: '2019-01',
      date: new Date('2019-04-03'),
    },
  },
  {
    type: 'appCoMonth',
    post: {
      title: 'Best Apps Awards (December 2018)',
      path: '2018-12',
      date: new Date('2019-04-03'),
      newOnly: true,
    },
  },
]
