import React from 'react'
import ReactWordcloud from 'react-wordcloud';

const words = [
    {
      text: 'told',
      value: Math.floor(Math.random() * 30 + 20),
    },
    {
      text: 'mistake',
      value: Math.floor(Math.random() * 30 + 20),
    },
    {
      text: 'thought',
      value: Math.floor(Math.random() * 30 + 20),
    },
    {
      text: 'bad',
      value: Math.floor(Math.random() * 30 + 20),
    },
    {
      text: 'happy',
       value: Math.floor(Math.random() * 30 + 20),
    },
    {
        text: 'hurt',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'need',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'hate',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'love',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'Kiera',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'improve',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'myself',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'change',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'help',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'mental',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'well',
         value: Math.floor(Math.random() * 30 + 20),
      },
      {
        text: 'ok',
        value: Math.floor(Math.random() * 30 + 20),
      },
                                
  ]

export const WordCloud = () => {
    return (
        <div>
            <ReactWordcloud words={words} />
        </div>
    )
}

export default WordCloud;