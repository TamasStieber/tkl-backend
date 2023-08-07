import { Router } from 'express';
import fetch from 'node-fetch';
import {
  InstagramFeed,
  InstagramPostExtended,
  InstagramPostPhoto,
} from '../interfaces/interfaces';

const router = Router();

const baseUrl =
  'https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables=';
const postBaseUrl =
  'https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables=';

const id = 3607982422;
const postsPerPage = 6;
const childCommentCount = 6;
const fetchCommentCount = 40;
const hasThreadedComments = true;
const parentCommentCount = 24;

router.get('/', async (req, res, next) => {
  const variables = JSON.stringify({
    id: id,
    first: postsPerPage,
  });

  // const url =
  //   'https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={"id":3607982422,"first":6}';

  const options = {
    method: 'GET',
  };

  let feed: (
    | {
        error: string;
      }
    | {
        postId: string;
        text: string;
        createdAt: string;
        photos: {
          photoId: string;
          url: string;
        }[];
      }
  )[];

  try {
    // fetch(baseUrl + variables, options)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     res.status(200).json(data);
    //   });

    const response = await fetch(baseUrl + variables, options);
    const data = await response.json();

    if(data.status && data.status !== 'ok') return res.status(503).json({error: 'Service unavailable, please try again later.'})

    const feedData = data.data.user
      .edge_owner_to_timeline_media as InstagramFeed;

    const postPromises = feedData.edges.map((post) =>
      fetchPost(post.node.shortcode)
    );
    feed = await Promise.all(postPromises);
    // feedData.edges.forEach((post) => {
    //   feed.push(fetchPost(post.node.shortcode));
    // });

    res.status(200).json(feed);
  } catch (error) {
    next(res.status(500).json({ error: 'Internal server error' }));
  }
});

router.get('/:endCursor', async (req, res, next) => {
  const endCursor = req.params.endCursor;

  const variables = JSON.stringify({
    id: id,
    first: postsPerPage,
    after: endCursor,
  });

  const options = {
    method: 'GET',
  };

  try {
    fetch(baseUrl + variables, options)
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {
    next(res.status(500).json({ error: 'Internal server error' }));
  }
});

// router.get('/post/:shortcode', async (req, res, next) => {
//   const shortcode = req.params.shortcode;

//   const variables = JSON.stringify({
//     child_comment_count: childCommentCount,
//     fetch_comment_count: fetchCommentCount,
//     has_threaded_comments: hasThreadedComments,
//     parent_comment_count: parentCommentCount,
//     shortcode: shortcode,
//   });

//   const options = {
//     method: 'GET',
//   };

//   try {
//     fetch(postBaseUrl + variables, options)
//       .then((response) => response.json())
//       .then((data) => {
//         res.status(200).json(data);
//       });
//   } catch (error) {
//     next(res.status(500).json({ error: 'Internal server error' }));
//   }
// });

const fetchPost = async (shortcode: string) => {
  const postBaseUrl =
    'https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables=';

  const variables = JSON.stringify({
    child_comment_count: childCommentCount,
    fetch_comment_count: fetchCommentCount,
    has_threaded_comments: hasThreadedComments,
    parent_comment_count: parentCommentCount,
    shortcode: shortcode,
  });

  const options = {
    method: 'GET',
  };

  let postId = '';
  let text = '';
  let createdAt = '';
  const photos = [];

  try {
    const response = await fetch(postBaseUrl + variables, options);
    const data = await response.json();
    
    if(data.status && data.status !== 'ok') return {error: 'Service unavailable, please try again later.'}

    const postData = data.data as InstagramPostExtended;

    postId = postData.shortcode_media.id;
    text = postData.shortcode_media.edge_media_to_caption.edges[0].node.text;
    createdAt = postData.shortcode_media.taken_at_timestamp;
    const mainPhoto = postData.shortcode_media.display_url;
    const photoArrayNode = postData.shortcode_media.edge_sidecar_to_children;

    if (photoArrayNode) {
      const photoPromises = photoArrayNode.edges.map(
        // (photo: InstagramPostPhoto) => fetchImage(photo.node.display_url)
        (photo: InstagramPostPhoto) => fetchImage(photo.node.display_url)
      );

      const photoUrls = await Promise.all(photoPromises);
      photoUrls.forEach((url, index) => {
        photos.push({
          photoId: photoArrayNode.edges[index].node.id,
          url: url,
        });
      });
    } else {
      photos.push({ photoId: postId + '_p', url: await fetchImage(mainPhoto) });
    }
  } catch (error) {
    return { error: 'Internal server error' };
  }

  return {
    postId: postId,
    text: text,
    createdAt: createdAt,
    photos: photos,
  };
};

const fetchImage = async (url: string) => {
  const imageResponse = await fetch(url);
  const imageBlob = await imageResponse.buffer();

  const encodedUrl = `data:${imageResponse.headers.get(
    'content-type'
  )};base64,${imageBlob.toString('base64')}`;

  return encodedUrl;
};

export default router;
