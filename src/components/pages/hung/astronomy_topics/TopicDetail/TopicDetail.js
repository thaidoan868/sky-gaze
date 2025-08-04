import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { astroTopics } from '../../data/astroTopicsData';
import { NotFound } from '../../../thai/not_found/NotFound/NotFound';

const TopicDetail = () => {
  const { topicId } = useParams();
  const topic = astroTopics.find(t => String(t.id) === String(topicId));

  if (!topic) {
    return <NotFound />;
  }

  return (
   <section className="py-5" style={{ backgroundColor: '#0c0c2a', marginTop: '3rem' }}>
      <div className="container text-white">
        
        <div className="text-center col-lg-8 mx-auto">
          <h1 className="display-4 mb-3">{topic.title}</h1>
          <p className="lead mb-5">{topic.summary}</p>
        </div>

        <img 
          src={topic.headerImage} // Use the new headerImage property
          alt={topic.title} 
          className="img-fluid rounded mb-5" 
          style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
        />

        <div className="col-lg-10 mx-auto">
          {/* Render the first block of text */}
          {topic.content && topic.content[0] && (
            <div className="mb-5" dangerouslySetInnerHTML={{ __html: topic.content[0] }} />
          )}


          {topic.gallery && topic.gallery.map((image, index) => {
            // Get the corresponding text block (skipping the first one)
            const textBlock = topic.content?.[index + 1] || '';
            
            const imageOrder = index % 2 === 0 ? 'order-md-1' : 'order-md-2';
            const textOrder = index % 2 === 0 ? 'order-md-2' : 'order-md-1';

            return (
              <div className="row g-5 align-items-center my-5" key={index}>
                {/* Image Column */}
                <div className={`col-md-6 ${imageOrder}`}>
                  <figure className="figure">
                    <img src={image.src} className="figure-img img-fluid rounded" alt={image.caption} />
                    {image.caption && <figcaption className="figure-caption text-light-emphasis">{image.caption}</figcaption>}
                  </figure>
                </div>
                {/* Text Column */}
                <div className={`col-md-6 ${textOrder}`}>
                  <div dangerouslySetInnerHTML={{ __html: textBlock }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-5">
          <Link to="/astronomy_topics" className="btn btn-outline-light">
            &larr; Back to Topics
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TopicDetail;