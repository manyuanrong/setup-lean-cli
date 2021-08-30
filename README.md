# setup-lean-cli

Setup LeanCloud cli

## Useage

```yml
steps:
  - uses: manyuanrong/setup-lean-cli@v1.0.0
    with:
      version: '0.25.0'
  - run: |
      lean login --region us-w1 --username ${{secrets.LEANCLOUD_USER}} --password ${{secrets.LEANCLOUD_PASS}}
      lean switch --region us-w1 --group web ${{secrets.LEANCLOUD_APP_ID}}
      lean deploy
```
