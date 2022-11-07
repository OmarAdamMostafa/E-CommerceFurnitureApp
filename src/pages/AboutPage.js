import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return <main>
    <PageHero title='about'/>
    <Wrapper className='page section section-center'>
      <img src={aboutImg} alt='nice desk'/>
      <article>
        <div className='title'>
          <h2>Our Story</h2>
          <div className='underline'></div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolor quas est ab!
          Cumque ullam porro eius a dignissimos aperiam eaque ex! Distinctio, eligendi repudiandae.
          Voluptas quisquam autem, laborum corporis, quas quidem fuga quis earum cum expedita,
          harum veritatis error soluta fugit perspiciatis deserunt maxime! Ex eveniet deserunt,
          dolores a quam repellat error debitis minima iusto beatae ullam nihil inventore.
        </p>
      </article>
    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
