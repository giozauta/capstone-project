//ესარის კატეგორის ასარჩევად როდესაც მოვნიშნავტ "Any" ის მაშინ გაითიშება მოსანიშნი ღილაკები 
document.getElementById("Any").addEventListener('change', function() {
    toggleCheckboxes(this.checked);
 
});

document.getElementById("Custom").addEventListener('change', function() {
    toggleCheckboxes(!this.checked);
    
});

function toggleCheckboxes(disable) {
    const checkboxes = document.getElementsByClassName("categoryName");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = disable;
    }
}
