build:
	gcloud docker -- pull $$(grep '^FROM' Dockerfile | grep -o ' .*' | tr -d ' ')
	docker-compose build

test:
	docker-compose run web yarn test:parallel

deploy:
	@utils/deploy

activate:
	@utils/activate
