import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { blogPosts } from "../blogData";
import ReactGA from 'react-ga4';

const TRACKING_ID = process.env.REACT_APP_TRACKING_ID;
if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID);
} else {
  console.warn('Google Analytics TRACKING_ID is not set. Skipping GA initialization.');
}


export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find(p => String(p.id) === String(id));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-green-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  // Related posts: find up to 3 other posts with at least one tag in common
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  // Social share URLs
  const shareUrl = `https://yuccahgardens.co.ke/blog/${post.id}`;
  const shareText = encodeURIComponent(`${post.title} | Yuccah garden landscapes Blog`);
  const shareDesc = encodeURIComponent(post.excerpt);
  const shareImage = encodeURIComponent(post.image);

  // JSON-LD structured data for this blog post
  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "author": { "@type": "Person", "name": post.author },
    "datePublished": post.date,
    "url": shareUrl,
    "description": post.excerpt
  };

  // Latest posts: 4 most recent, excluding current post
  const latestPosts = blogPosts
    .filter(p => p.id !== post.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 pb-12" itemScope itemType="https://schema.org/BlogPosting">
      <Helmet>
        <html lang="en" />
        <title>{post.title} | Yuccah garden landscapes Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content="landscaping ai, landscaping app free, landscaping around above ground pool, landscaping around deck, landscaping around house, landscaping adhesive, landscaping borders, landscaping boulders, landscaping business near me, landscaping cost, landscaping contractors near me, landscaping denver, landscaping dirt near me, landscaping dirt, landscaping edging ideas, landscaping edging stones, landscaping edging border, landscaping fabric, landscaping front of house, landscaping fence, landscaping front yard, landscaping fabric lowes, landscaping gravel, landscaping glue, landscaping grass, landscaping glue for rocks, landscaping help, landscaping ideas for front yard, landscaping ideas for side of house, landscaping jobs, landscaping jobs hiring, landscaping jobs near me part time, landscaping jobs for 16 year olds, landscaping knife, landscaping kingsport tn, landscaping knee pads, landscaping lights, landscaping lumber, landscaping logo ideas, landscaping lights wired, legacy landscaping, local landscaping companies, landscaping mulch, landscaping material, landscaping mulch near me, landscaping maintenance, landscaping mat, landscaping maintenance near me, landscaping near me within 5 mi, landscaping on a budget, landscaping odessa tx, landscaping plants, landscaping paper, landscaping pins, landscaping pebbles, landscaping prices, landscaping quote template, landscaping que es, landscaping quote example, landscaping quad cities, landscaping rock glue, landscaping river rock, landscaping rock calculator, landscaping stones, landscaping services near me, landscaping services, landscaping staples, landscaping sand, landscaping timbers, landscaping trees, landscaping timbers lowes, landscaping trim, landscaping trailers for sale, landscaping ties, landscaping under trees, landscaping under pine trees, landscaping union, landscaping under pine trees pictures, landscaping kenya government, landscaping vs lawn care, landscaping visualizer, landscaping vs gardening, landscaping vinegar, landscaping with rocks, landscaping wood, landscaping with river rock, landscaping websites, landscaping with hydrangeas, landscaping with coral bells, landscaping wood chips, landscaping yards near me, landscaping isiolo, landscaping nakuru, landscaping africa, landscaping kenya, landscaping mombasa, landscaping ruiru, landscaping zimmerman, landscaping tatu city, landscaping north eastern, landscaping nanyuki, landscaping nairobi, zone 0 landscaping, landscaping 101 for beginners, landscaping 101 pdf, landscaping 2025, landscaping 2 acres, landscaping 3 acres, 4d landscaping, landscaping 5 acres, landscaping 60638, landscaping 60634, 603 landscaping, landscaping 80016, 8 ft landscaping timbers, 903 landscaping, 924 landscaping, garden maintenance, lawn and garden maintenance, white house garden maintenance, a two word term for garden maintenance, lawn and garden maintenance near me, jims garden maintenance, glasgow garden maintenance, small garden maintenance near me, all seasons garden maintenance, general garden maintenance, small garden landscaping ideas, walkways and elevated platforms, plant disease and control in Kenya, plant disease and control in nairobi, man-made waterfalls and rivulets, man-made waterfalls near me, man-made rivers, SustainableLandscapingKenya, EcoFriendlyLandscapingNairobi, GreenGardensKenya, LandscapingContractorsNairobi, OutdoorDesignKenya, DroughtTolerantPlantsKE, RainwaterHarvestingNairobi, PermeablePavingKenya, GardenDesignNairobi, EcogreenLandscapers, NairobiHomes, KenyaGardens, ExcavationForPathways, SitePreparationKenya, TreeCareKenya, ProfessionalTreeCareNairobi, TreePruningNairobi, TreeRemovalKenya, ArboristNairobi, LandscapingKenya, GardenMaintenanceNairobi, HealthyTreesNairobi, PropertyValueKenya, TreeTrimmingServicesKE, StumpGrindingKenya, EcoFriendlyTreeCare, DreamGardenKE, HardscapingKenya, SoftscapingNairobi, EcoFriendlyGardensKE, GardenPlanning, PlantDiseasesKenya, GardenHealthNairobi, EcoFriendlyPestControlKE, ProfessionalGardenCareNairobi, IrrigationSystemsKenya, SoilImprovementNairobi, HealthyPlantsKenya, UrbanLandscapingNairobi, LandscapingProjectKenya, CommercialLandscapingKE, GreenSpacesNairobi, PropertyTransformationKE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#166534" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="canonical" href={shareUrl} />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Yuccah garden landscapes Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={post.image} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Yuccah garden landscapes Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <meta name="robots" content="index, follow" />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(postJsonLd)}</script>
      </Helmet>
      <div className="container mx-auto px-4 pt-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-1 min-w-0" itemScope itemType="https://schema.org/Article">
            <Link to="/blog" className="text-green-600 hover:underline mb-4 inline-block">&larr; Back to Blog</Link>
            <h1 className="text-4xl font-extrabold text-green-800 mb-2" itemProp="headline">{post.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-gray-500" itemProp="datePublished">{new Date(post.date).toLocaleDateString()}</span>
              <span className="text-sm text-green-700 font-semibold" itemProp="author">By {post.author}</span>
            </div>
            <img src={post.image} alt={post.title || 'Blog post image'} className="w-full h-64 object-cover rounded-lg mb-6" itemProp="image" />
            <div className="prose prose-green max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} itemProp="articleBody" />
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs" itemProp="keywords">{tag}</span>
              ))}
            </div>
            {/* Social Sharing Buttons */}
            <div className="mb-8 flex gap-4 items-center">
              <span className="font-semibold text-gray-700">Share:</span>
              <a
                href={`https://www.facebook.com/dialog/share?app_id=2466621547069886&display=popup&href=${encodeURIComponent(shareUrl)}&redirect_uri=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                title="Share on Facebook"
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
                title="Share on WhatsApp"
              >
                WhatsApp
              </a>
            </div>
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12" aria-label="Related Posts">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map(rp => (
                    <Link
                      key={rp.id}
                      to={`/blog/${rp.id}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col"
                    >
                      <img src={rp.image} alt={rp.title || 'Related post image'} className="w-full h-32 object-cover" />
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-green-800 mb-1">{rp.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">{new Date(rp.date).toLocaleDateString()}</p>
                        <p className="text-gray-700 text-sm flex-1">{rp.excerpt}</p>
                        <span className="text-green-600 hover:underline font-medium mt-auto">Read More &rarr;</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            <Link to="/blog" className="text-green-600 hover:underline mt-8 inline-block">&larr; Back to Blog</Link>
          </article>
          {/* Latest Posts Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0" aria-label="Latest Posts">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-green-800 mb-4">Latest Posts</h2>
              <ul className="space-y-4">
                {latestPosts.map(lp => (
                  <li key={lp.id}>
                    <Link to={`/blog/${lp.id}`} className="flex items-center gap-3 group">
                      <img src={lp.image} alt={lp.title || 'Latest post image'} className="w-16 h-16 object-cover rounded-md border border-green-100" />
                      <div>
                        <h3 className="text-base font-semibold text-green-700 group-hover:underline line-clamp-2">{lp.title}</h3>
                        <span className="text-xs text-gray-500">{new Date(lp.date).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
