function fn2() {
    /**
     * Here is my code. I don't want to tackle with existing code, it's using outdated javascript and way too messy, so I'll just throw in my code here.
     * Apologize for using English for comments cuz I don't have Chinese on my company computer, sorry
     */
    const RED_MARKER_URL = './img/mark_rs.png';
    const BLUE_MARKER_URL = './img/mark_bs.png';
// Flag for turn on/off rectangle drawing
    let drawRectEnabled = false;
// Initialize map
    let map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 16
    });
// Create mouse tool
    let mouseTool = null;
    map.plugin(["AMap.MouseTool"], () =>
    {
        mouseTool = new AMap.MouseTool(map);
    });
// Register function when mouse tool finish drawing
    AMap.event.addListener(mouseTool, 'draw', (event) => handleRect(event));

// This function is responsible for distributing markers over map
    addAllMarkers = () =>
    {
        // Get all marker data into local array
        let markerDataList = data.result.map(markerData =>
        {
            // Information of this marker
            let infoContent = [markerData.a1, markerData.a2, markerData.a3];
            // infoWindow
            let infoWindow = new AMap.InfoWindow({
                content: infoContent.join("<br>"),
                closeWhenClickMap: true,
            });
            // Actual marker
            let marker = new AMap.Marker({
                position: [markerData.x, markerData.y],
                icon: BLUE_MARKER_URL,
                extData: infoContent
            });
            // Register close event to infoWindow of this marker
            AMap.event.addListener(infoWindow, 'close', () =>
            {
                deselectMarker(marker, infoWindow);
            });
            // Register click event to this marker
            AMap.event.addListener(marker, 'click', () =>
            {
                if (marker.getIcon() === BLUE_MARKER_URL)
                {
                    selectMarker(marker, infoWindow);
                }
                else
                {
                    deselectMarker(marker, infoWindow)
                }
            });
            return marker;
        });
        // Now put all markers onto the map
        map.add(markerDataList);
    };
    addAllMarkers();

// Function for handling marker selection.
    selectMarker = (marker, infoWindow) =>
    {
        marker.setIcon(RED_MARKER_URL);
        if (infoWindow)
        {
            infoWindow.open(map, marker.getPosition());
        }
    };

// Function for canceling selected marker
    deselectMarker = (marker, infoWindow) =>
    {
        marker.setIcon(BLUE_MARKER_URL);
        if (infoWindow)
        {
            infoWindow.close();
        }
    };

// Function for drawing rectangle
    drawRect = () =>
    {
        if (drawRectEnabled)
        {
            // Clear existing infoWindow if any
            map.clearInfoWindow();
            map.getAllOverlays('marker').forEach(marker => {deselectMarker(marker)});
            mouseTool.close(true);
        }
        else
        {
            map.clearInfoWindow();
            mouseTool.rectangle();
        }
        drawRectEnabled = !drawRectEnabled;
    };
    document.getElementById('polygon').addEventListener('click', drawRect);

// Function for handling created rectangle
    handleRect = (event) =>
    {
        // Clear existing infoWindow if any
        map.clearInfoWindow();
        // Rectangle object created by drag'n'drop
        let rect = event.obj;
        let selectedMarkersInfoContent = [];
        // Get markers which are inside the rectangle and highlight them
        map.getAllOverlays('marker').forEach(marker =>
        {
            if (rect.contains(marker.getPosition()))
            {
                selectMarker(marker);
                // Add in current marker data
                selectedMarkersInfoContent = [...selectedMarkersInfoContent, ...marker.getExtData()];
            }
            else
            {
                deselectMarker(marker);
            }
        });

        // Open info window only if there are markers selected
        if (selectedMarkersInfoContent.length > 0)
        {
            // Info window for all selected markers
            let selectedMarkersInfoWindow = new AMap.InfoWindow({
                content: selectedMarkersInfoContent.join("<br>"),
                closeWhenClickMap: true,
            });
            selectedMarkersInfoWindow.open(map,
                new AMap.LngLat(rect.getBounds().getNorthEast().getLng(), rect.getBounds().getSouthWest().getLat()));
        }

        // Remove rectangle when done
        map.remove([rect]);
    };

// This is from old code, it decides map position
    mapfun = (index) =>
    {
        // Default map position. They were 119 and 38 when I started, don't know why, I just kept them as they were
        let x = 119;
        let y = 38;

        // If user select an item
        if (index !== -1)
        {
            x = data.result[index].x;
            y = data.result[index].y;
        }

        let position = new AMap.LngLat(x, y);
        map.setCenter(position);
    };
    /**
     * End of my code
     */
}
fn2();