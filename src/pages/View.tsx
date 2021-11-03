import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import { search } from 'ionicons/icons'
import { getAllRental } from '../databaseHandler';
import { RentHouse } from '../model';
import { useEffect, useState } from 'react';
import { RefresherEventDetail } from '@ionic/core';

const View: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [allRental, setAllRental] = useState<RentHouse[]>([]);

    async function fetchData() {

        const resultFromDB = await getAllRental();

        setAllRental(resultFromDB);
    }

    async function searchh() {
        var result = await getAllRental() as RentHouse[]
        if (searchText.trim().length > 0) {
            setAllRental(result.filter(p => p.propertytype == searchText))
        }
        else {
            setAllRental(result)
        }
    }

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData();
        setTimeout(() => {
            event.detail.complete();
        }, 1500);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <IonPage >
            <IonContent fullscreen >
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="home" />
                        </IonButtons>
                        <IonText class="head">
                            View
                        </IonText>
                        <IonButton slot="end" onClick={searchh} ><IonIcon icon={search} ></IonIcon></IonButton>
                    </IonToolbar>
                </IonHeader>

                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus"></IonSearchbar>

                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
                {allRental &&
                    
                    <IonList>
                        {allRental.map(c =>
                            
                            <IonItem  class = "txt" lines = "none" routerLink={'/Views/' + c.id} button key={c.id} >
                                <IonItem lines = "none">
                                    <img src={URL.createObjectURL(c.picBlob)} width="160" height="120" />
                                </IonItem>
                                <IonItem lines = "none">
                                    <h6>{c.propertytype}</h6>
                                </IonItem>
                            </IonItem>
                        )}
                    </IonList>
                }


            </IonContent>
        </IonPage>

    );
};

export default View;