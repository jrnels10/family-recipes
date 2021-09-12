import { CreateAnimation, IonButton, IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { basket, call, closeCircleOutline, code, ellipsisVerticalCircle, ellipsisVerticalCircleOutline, ellipsisVerticalOutline, filterCircle, filterCircleOutline, globe, heart, home, peopleCircleOutline, peopleOutline, pin, star } from 'ionicons/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, withRouter } from 'react-router';
import { motion, AnimatePresence } from "framer-motion"
import { Modal } from '../components/Modal';
import RecipeItem from '../components/RecipeItem';
import { Searchbar } from '../components/Searchbar';
import { AppContext } from '../Data/CTX/AppContext';
import './recipeList.scss';

const RecipeList: React.FC = () => {
  const { recipes, loadingRecipes, getRecipes, user } = useContext(AppContext);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('')
  useEffect(() => {
    if (user.validated) {
      getRecipes({});
    }
  }, [user]);

  const searchInput = (searchVal: string) => {
    setSearch(searchVal)
    getRecipes({ search: searchVal.toLocaleLowerCase(), filters });
  };

  const filterInput = (filterProps: IObjectKeys) => {
    setFilters(filterProps)
    getRecipes({ search: search.toLocaleLowerCase(), filters: filterProps });
  }

  return (
    <IonPage id="recipe-list">
      <IonHeader >
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Recipes</IonTitle>
          <IonButtons slot="end">
            {/* <Modal /> */}
            <IonButton onClick={() => setOpenFilter(!openFilter)}>
              <IonIcon icon={filterCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loadingRecipes ? <IonSpinner className='spin' name="crescent" /> : null}
        <IonGrid fixed={true}>
          <IonRow style={{ width: '100%' }}>
            <Filter openFilter={openFilter} setFilters={filterInput} />
            <Searchbar placeholder='search recipes' searchInput={searchInput} />
            {recipes.map((recipe, i) => (
              <RecipeItem
                key={recipe.id}
                recipe={recipe}
              />
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(RecipeList);


interface IObjectKeys {
  [key: string]: string | number;
}

interface IDevice extends IObjectKeys {
  id: number;
  room_id: number;
  name: string;
  type: string;
  description: string;
}


export const Filter = ({ openFilter, setFilters }: { openFilter: boolean, setFilters: any }) => {
  const [privacy, setPrivacy] = useState('both');
  const [appliedFilters, setAppliedFilters] = useState({})

  const changeFilter = (value: string, filtertype: string, filterFunction: any) => {
    filterFunction(value);
    const filt: IObjectKeys = appliedFilters;
    if (value === 'both' && filt) {
      delete filt[filtertype];
      setAppliedFilters({ ...filt });
      setFilters({ ...filt });
    } else {
      setAppliedFilters({ ...appliedFilters, ...{ [filtertype]: value } });
      setFilters({ ...appliedFilters, ...{ [filtertype]: value } });
    }
  }
  return <AnimatePresence>
    {openFilter && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: '50px' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ stiffness: 300 }}
        style={{ height: '50px', width: '100%', margin: '10px 15px' }}
      >
        <motion.div
          initial={{ opacity: 0, display: 'none' }}
          animate={{ opacity: 1, display: 'block' }}
          exit={{ opacity: 0, display: 'none' }}
        >
          <IonRow>
            <IonSegment value={privacy} onIonChange={e => changeFilter(e.detail.value!, 'privacy', setPrivacy)} color={privacy === 'both' ? 'medium' : privacy === 'private' ? 'primary' : 'secondary'}>
              <IonSegmentButton value='private'>
                <IonIcon icon={peopleCircleOutline} color='secondary' />
                <IonLabel color='secondary'>
                  Private
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value='both' >
                <IonIcon icon={code} color='medium' />
                <IonLabel color='medium'>
                  Both
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value='public' >
                <IonIcon icon={peopleOutline} color='primary' />
                <IonLabel color='primary'>
                  Public
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonRow>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
};
