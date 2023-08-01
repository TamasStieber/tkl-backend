import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

const baseUrl =
  'https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables=';
const id = 3607982422;
const postsPerPage = 6;

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

  console.log('ez: ' + req.query);

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

export default router;
