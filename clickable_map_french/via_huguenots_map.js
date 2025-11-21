/**
 * Via Huguenots - Carte Interactive
 * Script pour afficher une carte interactive avec marqueurs cliquables
 */

(function() {
    // Configuration des couleurs par type
    const typeColors = {
        'stage': '#ff6b6b',
        'alternative': '#FF9800',
        'urban': '#2196F3',
        'special': '#9C27B0',
        'regional': '#4CAF50'
    };

    // Charger les données depuis le JSON
    fetch('clickable_map_french/via_huguenots_merged.json')
        .then(response => response.json())
        .then(stages => {
            initMap(stages);
        })
        .catch(error => {
            console.error('Erreur de chargement des données:', error);
        });

    function initMap(stages) {
        const svg = document.getElementById('viaMapSvg');
        const tooltip = document.getElementById('viaTooltip');

        if (!svg || !tooltip) return;

        // Calculer la position d'affichage du marqueur (avec offset si nécessaire)
        function calculateMarkerPosition(stage) {
            if (!stage.offset_distance || stage.offset_distance === 0) {
                return { x: stage.x, y: stage.y };
            }
            const angleRad = (stage.offset_angle || 0) * Math.PI / 180;
            const offsetX = stage.offset_distance * Math.cos(angleRad);
            const offsetY = -stage.offset_distance * Math.sin(angleRad);
            return {
                x: stage.x + offsetX,
                y: stage.y + offsetY
            };
        }

        // Créer les lignes de connexion pour les marqueurs avec offset
        stages.forEach((stage) => {
            if (stage.offset_distance && stage.offset_distance > 0) {
                const markerPos = calculateMarkerPosition(stage);
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.classList.add('via-connection-line');
                line.setAttribute('x1', stage.x);
                line.setAttribute('y1', stage.y);
                line.setAttribute('x2', markerPos.x);
                line.setAttribute('y2', markerPos.y);
                line.setAttribute('stroke', typeColors[stage.type] || '#999');
                svg.appendChild(line);
            }
        });

        // Créer les marqueurs
        stages.forEach((stage) => {
            const markerPos = calculateMarkerPosition(stage);
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.classList.add('via-stage-marker', stage.type);
            group.setAttribute('data-stage-id', stage.id);

            // Créer un rectangle pour les routes régionales, un cercle pour les autres
            if (stage.type === 'regional') {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', markerPos.x - 25);
                rect.setAttribute('y', markerPos.y - 10);
                rect.setAttribute('width', '50');
                rect.setAttribute('height', '20');
                rect.setAttribute('rx', '3');
                group.appendChild(rect);

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', markerPos.x);
                text.setAttribute('y', markerPos.y);
                text.textContent = 'REG';
                group.appendChild(text);
            } else {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', markerPos.x);
                circle.setAttribute('cy', markerPos.y);
                circle.setAttribute('r', '10');
                group.appendChild(circle);

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', markerPos.x);
                text.setAttribute('y', markerPos.y);
                text.textContent = stage.id;
                group.appendChild(text);
            }

            svg.appendChild(group);

            // Événements
            group.addEventListener('click', function() {
                window.location.href = stage.url_fr;
            });

            group.addEventListener('mouseenter', function(e) {
                const nameSpan = tooltip.querySelector('.stage-name');
                nameSpan.textContent = stage.name_full_fr;
                nameSpan.className = 'stage-name ' + stage.type;
                tooltip.querySelector('.stage-distance').textContent = stage.distance || '';
                tooltip.classList.add('show');
                updateTooltipPosition(e);
            });

            group.addEventListener('mousemove', updateTooltipPosition);

            group.addEventListener('mouseleave', function() {
                tooltip.classList.remove('show');
            });
        });

        function updateTooltipPosition(e) {
            const x = e.clientX;
            const y = e.clientY;
            tooltip.style.left = (x + 15) + 'px';
            tooltip.style.top = (y - 10) + 'px';
        }
    }
})();
