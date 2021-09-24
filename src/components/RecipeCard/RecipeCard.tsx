import { IonCard } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { ReactChild } from "react"
import { IRecipe } from "../../Data/CTX/types"
import { RecipeCardBody } from "./RecipeBody"
import { RecipeImage } from "./RecipeImage"


export const RecipeCard = ({ recipe, edit }: { recipe?: IRecipe, edit: boolean }) => {

    return recipe ? <IonCard className='recipe_card'>
        <RecipeImage recipe={recipe} edit={edit}/>
        <RecipeCardBody recipe={recipe} edit={edit} />
    </IonCard>
        :
        null
};

