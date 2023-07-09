package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"

	"code.sajari.com/word2vec"
)

var model *word2vec.Model

func init() {

	f, err := os.Open("/Users/kirillsakharov/golang/GoogleNews-vectors-negative300.bin")
	if err != nil {
		log.Fatalf("error opening model file: %v", err)
	}

	model, err = word2vec.FromReader(f)
	if err != nil {
		log.Fatalf("error loading model: %v", err)
	}
}

func similarWordsHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "failed to read request body", http.StatusBadRequest)
		return
	}

	type Request struct {
		Word string `json:"word"`
	}

	var req Request
	err = json.Unmarshal(body, &req)
	if err != nil {
		http.Error(w, "failed to parse request body", http.StatusBadRequest)
		return
	}

	word := req.Word

	if word == "" {
		http.Error(w, "missing 'word' parameter", http.StatusBadRequest)
		return
	}

	expr := word2vec.Expr{}
	expr.Add(1, word)

	matches, err := model.CosN(expr, 10)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(matches)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/similar-words", similarWordsHandler)

	handler := cors.Default().Handler(mux)

	log.Fatal(http.ListenAndServe(":8080", handler))
}
