
import { Router } from 'express';
import * as publicController from '../controllers/public.controller';
import * as documentationController from '../controllers/documentation.controller';
import * as legalController from '../controllers/legal.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const publicRouter = Router();

// --- Swagger Tags for Public Content ---
/**
 * @swagger
 * tags:
 *   - name: Public - Pricing
 *     description: Publicly accessible pricing tier information.
 *   - name: Public - Testimonials
 *     description: Publicly accessible customer testimonials.
 *   - name: Public - FAQs
 *     description: Publicly accessible Frequently Asked Questions.
 *   - name: Public - Documentation
 *     description: Publicly accessible documentation articles.
 *   - name: Public - Legal
 *     description: Publicly accessible legal documents (Terms of Service, Privacy Policy).
 */

// --- PUBLIC GET routes (for landing page, etc.) ---
// These are open and do NOT require authentication.

/**
 * @swagger
 * /public/pricing:
 *   get:
 *     summary: Get all pricing tiers
 *     tags: [Public - Pricing]
 *     responses:
 *       200:
 *         description: A list of pricing tiers.
 */
publicRouter.get('/pricing', publicController.getAllPricingTiers);

/**
 * @swagger
 * /public/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Public - Testimonials]
 *     responses:
 *       200:
 *         description: A list of testimonials.
 */
publicRouter.get('/testimonials', publicController.getAllTestimonials);

/**
 * @swagger
 * /public/faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [Public - FAQs]
 *     responses:
 *       200:
 *         description: A list of FAQs.
 */
publicRouter.get('/faqs', publicController.getAllFaqs);

/**
 * @swagger
 * /public/documentation:
 *   get:
 *     summary: Get all documentation articles
 *     tags: [Public - Documentation]
 *     responses:
 *       200:
 *         description: A list of documentation articles.
 */
publicRouter.get('/documentation', documentationController.getAllArticles);

/**
 * @swagger
 * /public/documentation/{slug}:
 *   get:
 *     summary: Get a documentation article by its slug
 *     tags: [Public - Documentation]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single documentation article.
 */
publicRouter.get('/documentation/:slug', documentationController.getArticleBySlug);

/**
 * @swagger
 * /public/legal/{type}:
 *   get:
 *     summary: Get a legal document by type
 *     tags: [Public - Legal]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [terms, privacy]
 *     responses:
 *       200:
 *         description: A single legal document.
 */
publicRouter.get('/legal/:type', legalController.getLegalDocument);


// --- PROTECTED Admin routes for managing public content ---
// These routes for creating, updating, and deleting public content
// MUST come through an authenticated session (e.g., from the Admin dashboard).
publicRouter.post('/pricing', authMiddleware, publicController.createPricingTier);
publicRouter.put('/pricing/:id', authMiddleware, publicController.updatePricingTier);
publicRouter.delete('/pricing/:id', authMiddleware, publicController.deletePricingTier);

publicRouter.post('/testimonials', authMiddleware, publicController.createTestimonial);
publicRouter.put('/testimonials/:id', authMiddleware, publicController.updateTestimonial);
publicRouter.delete('/testimonials/:id', authMiddleware, publicController.deleteTestimonial);

publicRouter.post('/faqs', authMiddleware, publicController.createFaq);
publicRouter.put('/faqs/:id', authMiddleware, publicController.updateFaq);
publicRouter.delete('/faqs/:id', authMiddleware, publicController.deleteFaq);

publicRouter.post('/documentation', authMiddleware, documentationController.createArticle);
publicRouter.put('/documentation/:slug', authMiddleware, documentationController.updateArticle);
publicRouter.delete('/documentation/:slug', authMiddleware, documentationController.deleteArticle);

publicRouter.put('/legal/:type', authMiddleware, legalController.updateLegalDocument);


export default publicRouter;
