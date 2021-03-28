export default function contactsMap() {
    const element = document.querySelector('.js-contacts-map');

    if (!element) return;

    ymaps.ready(initialzeMap);

    function initialzeMap() {
        const lat = Number(element.getAttribute('data-lat'));
        const lng = Number(element.getAttribute('data-lng'));
        const pinURL = element.getAttribute('data-pin');
        // const balloonContent = element.getAttribute('data-balloon');

        let pinOptions = {
            iconLayout: 'default#image',
            iconImageHref: pinURL,
            iconImageSize: [92, 92],
            iconImageOffset: [-46, -92]
        };

        if (window.matchMedia('(max-width: 1024px)').matches) {
            pinOptions.iconImageSize = [46, 46];
            pinOptions.iconImageOffset = [-23, -46]
        }

        const center = [lat, lng];

        console.log('Center', center);

        const mapInstance = new ymaps.Map(element, {
            center: center,
            zoom: 14,
            controls: []
        });

        mapInstance.controls.add('zoomControl', {
            position: {
                right: 10,
                top: 70
            }
        })

        const objectManager = new ymaps.ObjectManager({
            clusterize: false,
            clusterHasBalloon: false,
            geoObjectOpenBalloonOnClick: true,
            clusterIconColor: '#e62f48'
        });
        mapInstance.geoObjects.add(objectManager);

        objectManager.add({
            id: 1,
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: center
            },
            options: {
                hideIconOnBalloonOpen: false,
                balloonCloseButton: false,
                ...pinOptions
            },
            // properties: {
            //     balloonContent: balloonContent
            // }
        });

        // objectManager.objects.balloon.open(1);
    }
}
