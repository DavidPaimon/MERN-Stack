import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cachea por una hora

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        return res.json(cachedResponse);
    } else {
        res.sendResponse = res.json;
        res.json = (body) => {
            cache.set(key, body);
            res.sendResponse(body);
        };
        next();
    }
};

export default cacheMiddleware;
