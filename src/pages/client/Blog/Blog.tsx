import React from 'react';
import Header from '../../../components/Layout/Header';
import IMG1 from '../img/img-01.jpg';
import IMG2 from '../img/img-02.jpg';
import IMG3 from '../img/img-03.jpg';
import IMG4 from '../img/img-04.jpg';
import IMG5 from '../img/img-05.jpg';
import IMG6 from '../img/img-06.jpg';

const Blog: React.FC = () => {
  return (
    <>
    <div className="grid h-screen" style={{ gridTemplateRows: 'auto 1fr auto' }}>
    <div className="row-start-1 row-end-2">
        <Header />
    </div>
    </div>
      <div className="container mx-auto px-4">
        <main className="tm-main">
          {/* Search form */}
          <div className="row tm-row">
            <div className="col-12">
              <form method="GET" className="flex items-center mb-20">
                <input className="form-control tm-search-input border rounded py-2 px-4 mr-2" name="query" type="text" placeholder="Search..." aria-label="Search" />
                <button className="tm-search-button bg-blue-500 text-white py-2 px-4 rounded" type="submit">
                  <i className="fas fa-search tm-search-icon" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Article 
              imgSrc={IMG1} 
              title="The Importance of Proper Nutrition for New Mothers" 
              description="Welcoming a new baby into the family is a joyous and transformative experience. However, it also brings a lot of changes, especially for new mothers. One of the key areas to focus on is proper nutrition, which is crucial for both the mother's health and the baby's development. In this blog post, we'll explore why proper nutrition is so important for new mothers and provide some practical tips on how to maintain a balanced diet during this critical period . . . (READ MORE)" 
            />
            <Article2
              imgSrc={IMG2}
              title="Choosing the Right Milk Formula for Your Baby" 
              description="Selecting the right milk formula for your baby can be a daunting task, given the myriad of options available on the market. Each baby is unique, and what works for one may not be suitable for another. In this blog post, we'll guide you through the process of choosing the right milk formula for your baby, considering factors such as nutritional content, special dietary needs, and personal preferences . . . (READ MORE)" 
            />
            <Article3
              imgSrc={IMG3} 
              title="Breastfeeding vs. Formula Feeding: Pros and Cons" 
              description="One of the most common decisions new parents face is whether to breastfeed or formula feed their baby. Both methods have their advantages and disadvantages, and the right choice varies for each family. In this blog post, we'll compare breastfeeding and formula feeding to help you make an informed decision that suits your family's needs and lifestyle . . . (READ MORE)" 
            />
            <Article4 
              imgSrc={IMG4}
              title="Tips for Introducing Solid Foods to Your Baby" 
              description="Introducing solid foods to your baby is an exciting milestone that marks the beginning of their culinary journey. However, it can also be a time of uncertainty and questions for many parents. In this blog post, we’ll provide you with practical tips and guidelines to help make the transition to solid foods a smooth and enjoyable experience for both you and your baby . . . (READ MORE)" 
            />
            <Article5 
              imgSrc={IMG5}
              title="Common Myths About Baby Nutrition Debunked" 
              description="When it comes to baby nutrition, there are many myths and misconceptions that can cause confusion for parents. In this blog post, we’ll debunk some of the most common myths about baby nutrition to help you make informed decisions and provide the best care for your little one . . . (READ MORE)" 
            />
            <Article6 
              imgSrc={IMG6}
              title="The Role of Omega-3 Fatty Acids in Infant Development" 
              description="Omega-3 fatty acids are essential nutrients that play a critical role in infant development, particularly for brain and eye health. In this blog post, we’ll explore the importance of omega-3 fatty acids, sources of these nutrients, and how to ensure your baby is getting enough for optimal growth and development . . . (READ MORE)" 
            />
          </div>
          <footer className="row tm-row">
            <hr className="col-12" />
          </footer>
        </main>
      </div>
      <script src="js/jquery.min.js"></script>
      <script src="js/templatemo-script.js"></script>
    </>
  );
};

interface ArticleProps {
  imgSrc: string;
  badge?: string;
  title: string;
  description: string;
}

const Article: React.FC<ArticleProps> = ({ imgSrc, badge, title, description }) => (
  <article className="col-12 col-md-6 tm-post">
    <hr className="tm-hr-primary" />
    <a href="BlogPost1.tsx" className="effect-lily tm-post-link tm-pt-60">
      <div className="tm-post-link-inner">
        <img src={imgSrc} alt="Image" className="img-fluid" />
      </div>
      {badge && <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1">{badge}</span>}
      <h2 className="mt-4 text-blue-500 text-2xl font-semibold">{title}</h2>
    </a>
    <p className="mt-4">
      {description}
    </p>
    <hr />
  </article>
);


const Article2: React.FC<ArticleProps> = ({ imgSrc, badge, title, description }) => (
  <article className="col-12 col-md-6 tm-post">
    <hr className="tm-hr-primary" />
    <a href="/blog-post-1" className="effect-lily tm-post-link tm-pt-60">
      <div className="tm-post-link-inner">
        <img src={imgSrc} alt="Image" className="img-fluid" />
      </div>
      {badge && <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1">{badge}</span>}
      <h2 className="mt-4 text-blue-500 text-2xl font-semibold">{title}</h2>
    </a>
    <p className="mt-4">
      {description}
    </p>
    <hr />
  </article>
);


const Article3: React.FC<ArticleProps> = ({ imgSrc, badge, title, description }) => (
  <article className="col-12 col-md-6 tm-post">
    <hr className="tm-hr-primary" />
    <a href="BlogPost1.tsx" className="effect-lily tm-post-link tm-pt-60">
      <div className="tm-post-link-inner">
        <img src={imgSrc} alt="Image" className="img-fluid" />
      </div>
      {badge && <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1">{badge}</span>}
      <h2 className="mt-4 text-blue-500 text-2xl font-semibold">{title}</h2>
    </a>
    <p className="mt-4">
      {description}
    </p>
    <hr />
  </article>
);


const Article4: React.FC<ArticleProps> = ({ imgSrc, badge, title, description }) => (
  <article className="col-12 col-md-6 tm-post">
    <hr className="tm-hr-primary" />
    <a href="BlogPost1.tsx" className="effect-lily tm-post-link tm-pt-60">
      <div className="tm-post-link-inner">
        <img src={imgSrc} alt="Image" className="img-fluid" />
      </div>
      {badge && <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1">{badge}</span>}
      <h2 className="mt-4 text-blue-500 text-2xl font-semibold">{title}</h2>
    </a>
    <p className="mt-4">
      {description}
    </p>
    <hr />
  </article>
);


const Article5: React.FC<ArticleProps> = ({ imgSrc, badge, title, description }) => (
  <article className="col-12 col-md-6 tm-post">
    <hr className="tm-hr-primary" />
    <a href="BlogPost1.tsx" className="effect-lily tm-post-link tm-pt-60">
      <div className="tm-post-link-inner">
        <img src={imgSrc} alt="Image" className="img-fluid" />
      </div>
      {badge && <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1">{badge}</span>}
      <h2 className="mt-4 text-blue-500 text-2xl font-semibold">{title}</h2>
    </a>
    <p className="mt-4">
      {description}
    </p>
    <hr />
  </article>
);


const Article6: React.FC<ArticleProps> = ({ imgSrc, badge, title, description }) => (
  <article className="col-12 col-md-6 tm-post">
    <hr className="tm-hr-primary" />
    <a href="BlogPost1.tsx" className="effect-lily tm-post-link tm-pt-60">
      <div className="tm-post-link-inner">
        <img src={imgSrc} alt="Image" className="img-fluid" />
      </div>
      {badge && <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1">{badge}</span>}
      <h2 className="mt-4 text-blue-500 text-2xl font-semibold">{title}</h2>
    </a>
    <p className="mt-4">
      {description}
    </p>
    <hr />
  </article>
);

export default Blog;
