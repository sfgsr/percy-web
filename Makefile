build:
	echo "BUILDING"
	gcloud docker -- pull $$(grep '^FROM' Dockerfile | grep -o ' .*' | tr -d ' ')
	docker-compose build

test:
	echo "TESTING"
	docker-compose up -d web
	docker-compose exec web yarn test:parallel

pusblish-test-artifacts:
	echo "PUBLISH TEST ARTIFACTS"
	@utils/publish-test-artifacts

teardown:
	echo "TEARING DOWN"
	docker-compose down web

publish:
	echo "PUBLISHING"
	@utils/publish
