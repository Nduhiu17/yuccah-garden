import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { blogPosts } from "../blogData";
import ReactGA from 'react-ga4';

const TRACKING_ID = process.env.REACT_APP_TRACKING_ID;
if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID);
} else {
  console.warn('Google Analytics TRACKING_ID is not set. Skipping GA initialization.');
}

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

const POSTS_PER_PAGE = 4;

export default function BlogMainPage() {
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState("");
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter(post =>
    (!selectedTag || post.tags.includes(selectedTag)) &&
    (post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <>
      {/* Link to return to main landing page */}
      <div className="mb-8 flex justify-start">
        <a href="/" className="text-green-700 hover:underline font-semibold text-base flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </a>
      </div>
      <Helmet>
        <html lang="en" />
        <title>Yuccah garden landscapes Blog | Sustainable Landscaping, Garden Design & Outdoor Living in Kenya</title>
        <meta name="description" content="Explore expert tips, project showcases, and the latest trends in sustainable landscaping, garden design, and outdoor living in Kenya. Stay inspired with Yuccah garden landscapes' world-class blog." />
        <meta name="keywords" content="landscaping ai, landscaping app free, landscaping around above ground pool, landscaping around deck, landscaping around house, landscaping adhesive, landscaping borders, landscaping boulders, landscaping business near me, landscaping cost, landscaping contractors near me, landscaping denver, landscaping dirt near me, landscaping dirt, landscaping edging ideas, landscaping edging stones, landscaping edging border, landscaping fabric, landscaping front of house, landscaping fence, landscaping front yard, landscaping fabric lowes, landscaping gravel, landscaping glue, landscaping grass, landscaping glue for rocks, landscaping help, landscaping ideas for front yard, landscaping ideas for side of house, landscaping jobs, landscaping jobs hiring, landscaping jobs near me part time, landscaping jobs for 16 year olds, landscaping knife, landscaping kingsport tn, landscaping knee pads, landscaping lights, landscaping lumber, landscaping logo ideas, landscaping lights wired, legacy landscaping, local landscaping companies, landscaping mulch, landscaping material, landscaping mulch near me, landscaping maintenance, landscaping mat, landscaping maintenance near me, landscaping near me within 5 mi, landscaping on a budget, landscaping odessa tx, landscaping plants, landscaping paper, landscaping pins, landscaping pebbles, landscaping prices, landscaping quote template, landscaping que es, landscaping quote example, landscaping quad cities, landscaping rock glue, landscaping river rock, landscaping rock calculator, landscaping stones, landscaping services near me, landscaping services, landscaping staples, landscaping sand, landscaping timbers, landscaping trees, landscaping timbers lowes, landscaping trim, landscaping trailers for sale, landscaping ties, landscaping under trees, landscaping under pine trees, landscaping union, landscaping under pine trees pictures, landscaping kenya government, landscaping vs lawn care, landscaping visualizer, landscaping vs gardening, landscaping vinegar, landscaping with rocks, landscaping wood, landscaping with river rock, landscaping websites, landscaping with hydrangeas, landscaping with coral bells, landscaping wood chips, landscaping yards near me, landscaping isiolo, landscaping nakuru, landscaping africa, landscaping kenya, landscaping mombasa, landscaping ruiru, landscaping zimmerman, landscaping tatu city, landscaping north eastern, landscaping nanyuki, landscaping nairobi, zone 0 landscaping, landscaping 101 for beginners, landscaping 101 pdf, landscaping 2025, landscaping 2 acres, landscaping 3 acres, 4d landscaping, landscaping 5 acres, landscaping 60638, landscaping 60634, 603 landscaping, landscaping 80016, 8 ft landscaping timbers, 903 landscaping, 924 landscaping, garden maintenance, lawn and garden maintenance, white house garden maintenance, a two word term for garden maintenance, lawn and garden maintenance near me, jims garden maintenance, glasgow garden maintenance, small garden maintenance near me, all seasons garden maintenance, general garden maintenance, small garden landscaping ideas, walkways and elevated platforms, plant disease and control in Kenya, plant disease and control in nairobi, man-made waterfalls and rivulets, man-made waterfalls near me, man-made rivers, SustainableLandscapingKenya, EcoFriendlyLandscapingNairobi, GreenGardensKenya, LandscapingContractorsNairobi, OutdoorDesignKenya, DroughtTolerantPlantsKE, RainwaterHarvestingNairobi, PermeablePavingKenya, GardenDesignNairobi, EcogreenLandscapers, NairobiHomes, KenyaGardens, ExcavationForPathways, SitePreparationKenya, TreeCareKenya, ProfessionalTreeCareNairobi, TreePruningNairobi, TreeRemovalKenya, ArboristNairobi, LandscapingKenya, GardenMaintenanceNairobi, HealthyTreesNairobi, PropertyValueKenya, TreeTrimmingServicesKE, StumpGrindingKenya, EcoFriendlyTreeCare, DreamGardenKE, HardscapingKenya, SoftscapingNairobi, EcoFriendlyGardensKE, GardenPlanning, PlantDiseasesKenya, GardenHealthNairobi, EcoFriendlyPestControlKE, ProfessionalGardenCareNairobi, IrrigationSystemsKenya, SoilImprovementNairobi, HealthyPlantsKenya, UrbanLandscapingNairobi, LandscapingProjectKenya, CommercialLandscapingKE, GreenSpacesNairobi, PropertyTransformationKE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#166534" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="canonical" href="https://yuccahgardens.co.ke/blog" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Yuccah garden landscapes Blog | Sustainable Landscaping, Garden Design & Outdoor Living in Kenya" />
        <meta property="og:description" content="Explore expert tips, project showcases, and the latest trends in sustainable landscaping, garden design, and outdoor living in Kenya. Stay inspired with Yuccah garden landscapes' world-class blog." />
        <meta property="og:url" content="https://yuccahgardens.co.ke/blog" />
        <meta property="og:image" content="https://placehold.co/1200x630/A2CC8A/333333?text=Yuccah+garden+landscapes+Blog" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yuccah garden landscapes Blog | Sustainable Landscaping, Garden Design & Outdoor Living in Kenya" />
        <meta name="twitter:description" content="Explore expert tips, project showcases, and the latest trends in sustainable landscaping, garden design, and outdoor living in Kenya. Stay inspired with Yuccah garden landscapes' world-class blog." />
        <meta name="twitter:image" content="https://placehold.co/1200x630/A2CC8A/333333?text=Yuccah+garden+landscapes+Blog" />
        <meta name="robots" content="index, follow" />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Yuccah garden landscapes Blog",
          "description": "Explore expert tips, project showcases, and the latest trends in sustainable landscaping, garden design, and outdoor living in Kenya. Stay inspired with Yuccah garden landscapes' world-class blog.",
          "url": "https://yuccahgardens.co.ke/blog",
          "blogPost": paginated.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.image,
            "author": { "@type": "Person", "name": post.author },
            "datePublished": post.date,
            "url": `https://yuccahgardens.co.ke/blog/${post.id}`,
            "description": post.excerpt
          }))
        })}</script>
      </Helmet>
      <main className="container mx-auto px-4 pt-8" itemScope itemType="https://schema.org/Blog">
        <header>
          <h1 className="text-4xl font-extrabold text-green-800 mb-4 text-center" itemProp="headline">Yuccah garden landscapes Blog</h1>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto" itemProp="description">Explore expert landscaping tips, project showcases, and inspiration for beautiful, sustainable outdoor spaces in Kenya and beyond.</p>
        </header>
        <nav aria-label="Blog Filters" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full sm:w-1/2 px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Search blog posts"
          />
          <select
            value={selectedTag}
            onChange={e => { setSelectedTag(e.target.value); setPage(1); }}
            className="w-full sm:w-1/4 px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Filter by topic"
          >
            <option value="">All Topics</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag.replace(/\b\w/g, l => l.toUpperCase())}</option>
            ))}
          </select>
        </nav>
        <section aria-label="Blog Posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {paginated.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <a
                href={`/blog/${post.id}`}
                tabIndex={0}
                aria-label={`Read more about ${post.title}`}
                itemProp="url"
              >
                <img src={post.image} alt={post.title || 'Blog post image'} className="w-full h-48 object-cover" loading="lazy" itemProp="image" />
              </a>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-green-800 mb-2" itemProp="headline">
                  <a href={`/blog/${post.id}`} tabIndex={0} aria-label={`Read more about ${post.title}`} itemProp="url">{post.title}</a>
                </h2>
                <div className="text-sm text-gray-500 mb-2">
                  <time dateTime={post.date} itemProp="datePublished">{new Date(post.date).toLocaleDateString()}</time>
                  {" | "}
                  <span itemProp="author">{post.author}</span>
                </div>
                <p className="text-gray-700 text-base mb-4 flex-1" itemProp="description">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs" itemProp="keywords">{tag}</span>
                  ))}
                </div>
                <span className="text-green-600 hover:underline font-medium mt-auto">Read More &rarr;</span>
              </div>
            </article>
          ))}
        </section>
        {/* Pagination */}
        <nav className="flex justify-center items-center gap-2 mt-10" aria-label="Pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-full bg-green-200 text-green-800 font-bold disabled:opacity-50"
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="text-green-800 font-semibold">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-full bg-green-200 text-green-800 font-bold disabled:opacity-50"
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      </main>
    </>
  );
}
