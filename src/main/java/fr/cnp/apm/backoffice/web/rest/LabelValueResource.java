package fr.cnp.apm.backoffice.web.rest;
import fr.cnp.apm.backoffice.domain.LabelValue;
import fr.cnp.apm.backoffice.service.LabelValueService;
import fr.cnp.apm.backoffice.web.rest.errors.BadRequestAlertException;
import fr.cnp.apm.backoffice.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing LabelValue.
 */
@RestController
@RequestMapping("/api")
public class LabelValueResource {

    private final Logger log = LoggerFactory.getLogger(LabelValueResource.class);

    private static final String ENTITY_NAME = "labelValue";

    private final LabelValueService labelValueService;

    public LabelValueResource(LabelValueService labelValueService) {
        this.labelValueService = labelValueService;
    }

    /**
     * POST  /label-values : Create a new labelValue.
     *
     * @param labelValue the labelValue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new labelValue, or with status 400 (Bad Request) if the labelValue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/label-values")
    public ResponseEntity<LabelValue> createLabelValue(@RequestBody LabelValue labelValue) throws URISyntaxException {
        log.debug("REST request to save LabelValue : {}", labelValue);
        if (labelValue.getId() != null) {
            throw new BadRequestAlertException("A new labelValue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LabelValue result = labelValueService.save(labelValue);
        return ResponseEntity.created(new URI("/api/label-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /label-values : Updates an existing labelValue.
     *
     * @param labelValue the labelValue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated labelValue,
     * or with status 400 (Bad Request) if the labelValue is not valid,
     * or with status 500 (Internal Server Error) if the labelValue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/label-values")
    public ResponseEntity<LabelValue> updateLabelValue(@RequestBody LabelValue labelValue) throws URISyntaxException {
        log.debug("REST request to update LabelValue : {}", labelValue);
        if (labelValue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LabelValue result = labelValueService.save(labelValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, labelValue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /label-values : get all the labelValues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of labelValues in body
     */
    @GetMapping("/label-values")
    public List<LabelValue> getAllLabelValues() {
        log.debug("REST request to get all LabelValues");
        return labelValueService.findAll();
    }

    /**
     * GET  /label-values/:id : get the "id" labelValue.
     *
     * @param id the id of the labelValue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the labelValue, or with status 404 (Not Found)
     */
    @GetMapping("/label-values/{id}")
    public ResponseEntity<LabelValue> getLabelValue(@PathVariable Long id) {
        log.debug("REST request to get LabelValue : {}", id);
        Optional<LabelValue> labelValue = labelValueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(labelValue);
    }

    /**
     * DELETE  /label-values/:id : delete the "id" labelValue.
     *
     * @param id the id of the labelValue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/label-values/{id}")
    public ResponseEntity<Void> deleteLabelValue(@PathVariable Long id) {
        log.debug("REST request to delete LabelValue : {}", id);
        labelValueService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
