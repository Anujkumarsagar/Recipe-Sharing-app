import { ThumbsUp } from 'lucide-react';
import React from 'react';

function Card({ rotate, recipe, onCardClick }) {
    return (
        <div
            className={` transition-all absolute m-auto w-[300px] lg:w-[400px] card bg-black border border-black rounded-xl overflow-hidden ${rotate}`}
            onClick={onCardClick} // Trigger onCardClick when the card is clicked
            tabIndex={0} // Make it accessible
        >
            <div className='object-cover'>
                <img 
                    src={recipe.image} 
                    className='h-[300px] lg:h-[400px] w-full object-cover' 
                    alt={recipe.title} 
                />
            </div>
            <div className='bg-white p-2'>
                <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                    <p className="text-gray-600">{recipe.description}</p>
                </div>
                <div className='flex items-center justify-around'>
                    <p className="flex items-center">
                        <ThumbsUp className="mr-1" />
                        <span>{recipe.likes}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;
