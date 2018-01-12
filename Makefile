build:
	gcloud docker -- pull $$(grep '^FROM' Dockerfile | grep -o ' .*' | tr -d ' ')
	docker-compose build

test:
	docker-compose up -d web
	docker-compose exec web yarn test:parallel
	@utils/publish-test-artifacts
	docker-compose down web

publish:
	@utils/publish
